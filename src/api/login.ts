import actionRequest from '@/utils/request'

/**
 * @description: 登录接口
 * @param {T} data
 * @return {*}
 */
export const loginPost = (data: { username: string; password: string }): Promise<any> => {
  return actionRequest(
    {
      url: '/api/users/v1/auth/token',
      method: 'post',
      data
    },
    {
      serverType: 'project'
    }
  )
}

export const getUserInfo = (params?: object): Promise<any> => {
  return actionRequest(
    {
      url: '/api/users/v1/users/me',
      method: 'get',
      params
    },
    {
      serverType: 'project'
    }
  )
}

// 平台列表
export const getAllPlatform = (params?: any) => {
  return actionRequest(
    {
      url: `/api/users/v1/platforms`,
      method: 'get',
      params
    },
    {
      serverType: 'project'
    }
  )
}
// 通过授权码获取Access Token
export const codeGetToken = (data: object): Promise<any> => {
  return actionRequest(
    {
      url: '/api/order-server/v1/oauth/access-token',
      method: 'post',
      data
    },
    {
      serverType: 'project'
    }
  )
}

export const changePwd = (data: any) => {
  return actionRequest(
    {
      url: `/api/users/v1/users/me:change-password`,
      method: 'post',
      data
    },
    {
      serverType: 'business'
    }
  )
}
