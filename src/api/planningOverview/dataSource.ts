import actionRequest from '@/utils/request'

/**
 * @description: 分页列表查询
 * @param {T} params
 * @return {*}
 */
// 数据源-列表
export const getPlanningDataSourceList = (params: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-source`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
// 数据源-删除
export const deletePlanningDataSourceList = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-source/${data.id}`,
      method: 'delete',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 数据源-编辑
export const editPlanningDataSource = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-source/${data.id}`,
      method: 'put',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 数据源-添加
export const addPlanningDataSource = (data: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-source`,
      method: 'post',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}

// 数据源-详情
export const getPlanningDataSourceDetail = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/data-source/${params.id}`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}

// 区域数据源-列表
export const getAreaDataSourceList = (params: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/region-data-source`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
// 区域数据源-删除
export const deleteAreaDataSourceList = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/region-data-source/${data.id}`,
      method: 'delete',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 区域数据源-编辑
export const editAreaDataSource = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/region-data-source/${data.id}`,
      method: 'put',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 区域数据源-添加
export const addAreaDataSource = (data: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/region-data-source`,
      method: 'post',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 区域数据源-详情
export const getAreaDataSourceDetail = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/region-data-source/${params.id}`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}

// 领域数据源-列表
export const getDomainDataSourceList = (params: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/domain-data-sources`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
// 领域数据源-删除
export const deleteDomainDataSourceList = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/domain-data-sources/${data.id}`,
      method: 'delete',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 领域数据源-编辑
export const editDomainDataSource = (data: any): Promise<any> => {
  return actionRequest(
    {
      url: `/api/order-server/v1/domain-data-sources/${data.id}`,
      method: 'put',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 领域数据源-添加
export const addDomainDataSource = (data: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/domain-data-sources`,
      method: 'post',
      data
    },
    {
      serverType: 'datashop'
    }
  )
}
// 领域数据源-详情
export const getDomainDataSourceDetail = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/domain-data-sources/${params.id}`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
// 领域列表
export const getHistoryDomainList = (params: any) => {
  return actionRequest(
    {
      url: `/api/order-server/v1/domains`,
      method: 'get',
      params
    },
    {
      serverType: 'datashop'
    }
  )
}
