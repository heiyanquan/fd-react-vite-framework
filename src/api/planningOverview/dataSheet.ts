import actionRequest from '@/utils/request'

/**
 * @description: 分页列表查询
 * @param {T} params
 * @return {*}
 */
export const getPlanningDataSheetList = (params: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-tables`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}

export const deletePlanningDataSheetList = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-tables/${data.id}`,
      method: 'delete',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

export const editPlanningDataSheet = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-tables/${data.id}`,
      method: 'put',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 添加
export const addPlanningDataSheet = (data: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-tables`,
      method: 'post',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 详情
export const getPlanningDataSheetDetail = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-tables/${params.id}`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
