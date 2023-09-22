import actionRequest from '@/utils/request'

/**
 * @description: 分页列表查询
 * @param {T} params
 * @return {*}
 */
export const getPlanningSubclassList = (params: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/sub-topic-domains`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}

export const deletePlanningSubclassList = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/sub-topic-domains/${data.id}`,
      method: 'delete',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

export const editPlanningSubclass = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/sub-topic-domains/${data.id}`,
      method: 'put',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 添加
export const addPlanningSubclass = (data: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/sub-topic-domains`,
      method: 'post',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 详情
export const getPlanningSubclassDetail = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/sub-topic-domains/${params.id}`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
