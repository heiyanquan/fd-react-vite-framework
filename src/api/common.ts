import actionRequest from '@/utils/request'

// 上传pdf
export const uploadPdf = (data: any) => {
  return actionRequest(
    {
      url: '/api/datamarket/file/upload',
      method: 'post',
      data
    },
    {
      serverType: 'business'
    }
  )
}
// 获取用户列表
export const getAllUserList = (params: any = {}): Promise<any> => {
  return actionRequest(
    {
      url: '/api/order-server/v1/users',
      method: 'get',
      params: {
        page: 1,
        page_size: 1000,
        ...params
      }
    },
    {
      serverType: 'datashop'
    }
  ).then((res: any) =>
    res.items.map((item) => ({
      label: item.name,
      value: item.id
    }))
  )
}

// 获取关联项目名称
export const getAllProjectList = (params: any = {}): Promise<any> => {
  return actionRequest(
    {
      url: `/api/project/v1/projects/`,
      method: 'get',
      params: {
        page: 1,
        page_size: 10000,
        do_page: false,
        ...params
      }
    },
    {
      serverType: 'project'
    }
  ).then((res) =>
    res.data.map((item) => ({
      label: item.name,
      value: item.id
    }))
  )
}
