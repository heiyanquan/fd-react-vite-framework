import actionRequest from '@/utils/request'

/**
 * @description: 分页列表查询
 * @param {T} params
 * @return {*}
 */
export const getPlanningThemeList = (params: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/topic-domains`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}

export const deletePlanningThemeList = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/topic-domains/${data.id}`,
      method: 'delete',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

export const editPlanningTheme = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/topic-domains/${data.id}`,
      method: 'put',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 添加
export const addPlanningTheme = (data: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/topic-domains`,
      method: 'post',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 详情
export const getPlanningThemeDetail = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/topic-domains/${params.id}`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
