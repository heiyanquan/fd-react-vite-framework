import axios, { AxiosRequestConfig } from 'axios'
import { TOKEN } from '@/utils/constant'
import { getItem, removeAllItem } from '@/utils/storage'
import type { TCustomOptions } from '@/types/request'
// 公共消息类型
import type { TMessageType } from '@/types/message'
import { message } from 'antd'

const pendingMap = new Map()
const LoadingInstance = {
  _count: 0
}
/**
 * @description: 请求实体
 * @param {AxiosRequestConfig} axiosConfig axios配置
 * @param {} customOptions 自定义配置
 * @return {*}
 */
function mainAxios(axiosConfig: AxiosRequestConfig, customOptions?: any) {
  let configBaseURL = import.meta.env.VITE_APP_LOGIN_URL as string

  if (customOptions && customOptions.serverType) {
    switch (customOptions.serverType) {
      //业务接口
      case 'business':
        configBaseURL = import.meta.env.VITE_BUSINESS_API_URL as string
        break
      case 'ucenter':
        configBaseURL = import.meta.env.VITE_APP_LOGIN_URL as string
        break
    }
  }
  const service = axios.create({
    baseURL: configBaseURL, // 设置统一的请求前缀
    timeout: 60000 // 设置统一的超时时长
  })

  // 自定义配置
  const custom_options: TCustomOptions = Object.assign(
    {
      repeat_request_cancel: false, // 是否开启取消重复请求, 默认为 true
      loading: true, // 是否开启loading层效果, 默认为true
      reduct_data_format: true, // 是否开启简洁的数据结构响应, 默认为true
      error_message_show: true, // 是否开启接口错误信息展示,默认为true
      code_message_show: true // 是否开启code不为200时的信息提示, 默认为false
    },
    customOptions
  )

  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      removePending(config)
      custom_options.repeat_request_cancel && addPending(config)
      // 创建loading实例
      if (custom_options.loading) {
        LoadingInstance._count++
      }

      // 自动携带token
      if (getItem(TOKEN)) {
        config.headers['Authorization'] = `Bearer ${getItem(TOKEN)}`
        if (config.headers && axiosConfig.url && axiosConfig.url.indexOf('/api/project/v1/projects') > -1) {
          Reflect.deleteProperty(config.headers, 'Authorization')
        }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // 响应拦截
  service.interceptors.response.use(
    (response) => {
      if (axiosConfig.responseType === 'blob') {
        const contentDisposition = response.headers['content-disposition']
        let fileName = contentDisposition.split(';')[1].split('=')[1]
        fileName = `${decodeURIComponent(fileName)}`
        response.data.name = fileName
        return response.data
      }
      if (response.config.url.indexOf('/api/project/v1/projects') > -1) {
        return response // code不等于200, 页面具体逻辑就不执行了
      }
      removePending(response.config)
      custom_options.loading && closeLoading(custom_options, true) // 关闭loading
      if (response.status === 200 || response.status === 201) {
        if (
          (custom_options.code_message_show && response.data && response.data.code === 200) ||
          !response.data ||
          (response.data && !response.data.code)
        ) {
          return custom_options.reduct_data_format ? response.data : response
        } else {
          custom_options.error_message_show && httpSuccessStatusHandle(response)
          return Promise.reject(response.data)
        }
        // 公共信息补抓
      } else {
        custom_options.error_message_show && httpSuccessStatusHandle(response) // 处理错误状态码
        return Promise.reject(response.data) // code不等于200, 页面具体逻辑就不执行了
      }
    },
    (error) => {
      error.config && removePending(error.config)
      custom_options.loading && closeLoading(custom_options, false) // 关闭loading
      custom_options.error_message_show && httpErrorStatusHandle(error) // 处理错误状态码
      return Promise.reject(error) // 错误继续返回给到具体页面
    }
  )

  return service(axiosConfig)
}

export default mainAxios

/**
 * @description: 处理异常
 * @param {any} error
 * @return {*}
 */
function httpErrorStatusHandle(error: any) {
  // 处理被取消的请求
  if (axios.isCancel(error)) {
    return
  }
  let text = ''
  let logout = false
  if (error && error.response) {
    text = error.response.data.detail
    if (error.response.data.details) {
      text = error.response.data.details.name[0]
    }
    if (error.response.status === 401) {
      logout = true
    }
  }
  if (!text) {
    text = '服务端异常'
  }
  message.warning(text)
  if (logout) {
    removeAllItem()
    const returnto = window.location.href
    const url = `${window.location.origin}/login?returnto=${encodeURIComponent(returnto)}`
    window.location.href = url
  }
}

/**
 * http成功,业务状态提示处理（部分在200中返回的错误code。严格要求后端按规范返回状态码，走error手柄）
 * @param response
 */

function httpSuccessStatusHandle(response: any) {
  let text = ''
  let messageStatus: TMessageType = 'success'
  switch (response.data.code) {
    case -1:
      // 执行退出
      text = response.data.message || response.data.msg || '服务端异常'
      messageStatus = 'warning'
      break
    case 403:
      // 执行退出
      text = '无权限!'
      messageStatus = 'warning'
      break
    default:
      text = `${response.data.message || response.data.msg}`
      messageStatus = 'warning'
  }
  if (!text) {
    text = '服务端异常'
  }
  message[messageStatus](text)
}

/**
 * @description: 关闭Loading层实例
 * @param {TCustomOptions} _options
 * @param {boolean} type
 * @return {*}
 */
function closeLoading(_options: TCustomOptions) {
  if (_options.loading && LoadingInstance._count > 0) LoadingInstance._count--
}

/**
 * @description: 储存每个请求的唯一cancel回调, 以此为标识
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function addPending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config)
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pendingMap.has(pendingKey)) {
        pendingMap.set(pendingKey, cancel)
      }
    })
}

/**
 * @description: 删除重复的请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function removePending(config: AxiosRequestConfig) {
  const pendingKey = getPendingKey(config)
  if (pendingMap.has(pendingKey)) {
    const cancelToken = pendingMap.get(pendingKey)
    // 如你不明白此处为什么需要传递pendingKey可以看文章下方的补丁解释
    cancelToken(pendingKey)
    pendingMap.delete(pendingKey)
  }
}

/**
 * @description: 生成唯一的每个请求的唯一key
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
function getPendingKey(config: AxiosRequestConfig) {
  const { url, method, params } = config
  let { data } = config
  if (typeof data === 'string') data = JSON.parse(data) // response里面返回的config.data是个字符串对象
  return [url, method, JSON.stringify(params), JSON.stringify(data)].join('&')
}
