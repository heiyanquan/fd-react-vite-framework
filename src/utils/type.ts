function _get(value: number | string | undefined, list: any[]) {
  if (value !== undefined) {
    const tmp = list.find((x: any) => {
      return x.value === value
    })
    if (tmp) return tmp.label
    return ''
  } else {
    return list
  }
}

export function getDataSheetAttributes(value: number | undefined = undefined) {
  const list = [
    {
      label: '全部',
      value: 0
    },
    {
      label: '主表',
      value: 1
    },
    {
      label: '从表-属性表',
      value: 2
    },
    {
      label: '从表-实体关联表',
      value: 3
    },
    {
      label: '配置表',
      value: 4
    },
    {
      label: '其他',
      value: 5
    }
  ]
  return _get(value, list)
}

// 数据表状态
export function getDataSheetStatus(value: number | undefined = undefined) {
  const list = [
    {
      label: '全部',
      value: 0
    },
    {
      label: '规划中',
      value: 1
    },
    {
      label: '可用',
      value: 2
    },
    { label: '废弃', value: -1 }
  ]
  return _get(value, list)
}
// 数据源状态
export function getDataSourceStatus(value: number | undefined = undefined) {
  const list = [
    {
      label: '规划中',
      value: 1
    },
    {
      label: '可用',
      value: 2
    },
    {
      label: '停止更新',
      value: 3
    },
    {
      label: '废弃',
      value: -1
    }
  ]
  return _get(value, list)
}

export function getDataSheetKeyFocus(value: number | undefined = undefined) {
  const list = [
    {
      label: '全部',
      value: 0
    },
    {
      label: '重点表单',
      value: 1
    },
    {
      label: '非重点表单',
      value: 2
    }
  ]
  return _get(value, list)
}
// 将status的number转化为boolean
export function handleDataSheetKeyFocus(value: number) {
  let status
  if (value === 1) {
    status = true
  } else if (value === 2) {
    status = false
  }
  return status
}
// 将status的boolean转化为number
export function handleDataSheetEditKeyFocus(status: number) {
  let value
  if (status) {
    value = 1
  } else {
    value = 2
  }
  return value
}

export function getDataSheetPlanningDimension(value: number | undefined = undefined) {
  const list = [
    {
      label: '按照区域',
      value: 1
    },
    {
      label: '按照源',
      value: 2
    },
    {
      label: '按照领域',
      value: 3
    }
  ]
  return _get(value, list)
}
export function DemandSources(value: number | undefined = undefined) {
  const list = [
    {
      label: '咨询项目',
      value: '咨询项目'
    },
    {
      label: '产业大脑项目',
      value: '产业大脑项目'
    },
    {
      label: '产业大脑SAAS',
      value: '产业大脑SAAS'
    },
    {
      label: '金融数据服务项目',
      value: '金融数据服务项目'
    },
    {
      label: '公司领导',
      value: '公司领导'
    },
    {
      label: '运营需求',
      value: '运营需求'
    },
    {
      label: '自主规划',
      value: '自主规划'
    },
    {
      label: '其他',
      value: '其他'
    }
  ]
  return _get(value, list)
}

export function logType(value: number | undefined = undefined) {
  const list = [
    {
      label: '创建订单',
      value: 'creation'
    },
    {
      label: '驳回订单',
      value: 'rejection'
    },
    {
      label: '撤回订单',
      value: 'cancellation'
    },
    {
      label: '转派',
      value: 'transfer'
    },
    {
      label: '运营接收',
      value: 'reception'
    },
    {
      label: '交付数据包',
      value: 'data_delivery'
    },
    {
      label: '完成验收',
      value: 'acceptance'
    }
  ]
  return _get(value, list)
}

//规划订单的状态
export function order_state(value: number | undefined = undefined) {
  const list = [
    {
      label: '已撤回',
      value: -1
    },
    {
      label: '草稿',
      value: 0
    },
    {
      label: '待接收',
      value: 1
    },
    {
      label: '驳回',
      value: 2
    },
    {
      label: '执行中',
      value: 3
    },
    {
      label: '待验收',
      value: 4
    },
    {
      label: '已完成',
      value: 5
    }
  ]
  return _get(value, list)
}

//需求订单的状态
export function demandOrder_state(value: number | undefined = undefined) {
  const list = [
    {
      label: '全部',
      value: -1
    },
    {
      label: '草稿',
      value: 0
    },
    {
      label: '待接收',
      value: 1
    },
    {
      label: '驳回',
      value: 2
    },
    {
      label: '待评估',
      value: 3
    },
    {
      label: '执行中',
      value: 4
    },
    {
      label: '待验收',
      value: 5
    },
    {
      label: '已完成',
      value: 6
    }
  ]
  return _get(value, list)
}

// 数据来源类型
export function getDataSourceType(value: number | undefined = undefined) {
  const list = [
    {
      label: '官方数据',
      value: 1
    },
    {
      label: '互联网公开信息',
      value: 2
    },
    {
      label: '第三方机构',
      value: 3
    },
    {
      label: '自主建设',
      value: 4
    }
  ]
  return _get(value, list)
}
// 来源等级
export function getDataSourceLevel(value: number | undefined = undefined) {
  const list = [
    {
      label: '国家级',
      value: 1
    },
    {
      label: '省级',
      value: 2
    },
    {
      label: '市级',
      value: 3
    },
    {
      label: '区县级',
      value: 4
    },
    {
      label: '园区级',
      value: 5
    },
    {
      label: '行业级',
      value: 6
    },
    {
      label: '未定级',
      value: 7
    }
  ]
  return _get(value, list)
}
// 更新周期
export function getDataUpdateCycle(value: number | undefined = undefined) {
  const list = [
    {
      label: '每天',
      value: 1
    },
    {
      label: '每周',
      value: 2
    },
    {
      label: '每半月',
      value: 3
    },
    {
      label: '每月',
      value: 4
    },
    {
      label: '每季度',
      value: 5
    },
    {
      label: '每半年',
      value: 6
    },
    {
      label: '每年',
      value: 7
    },
    {
      label: '不定期',
      value: 8
    }
  ]
  return _get(value, list)
}

export function ordername(value: number | undefined = undefined, list: any) {
  return _get(value, list)
}
// 维护方式
export function getDataMaintenanceMode(value: number | undefined = undefined) {
  const list = [
    {
      label: '人工',
      value: 1
    },
    {
      label: '程序',
      value: 2
    },
    {
      label: '爬虫',
      value: 3
    },
    {
      label: '供应商',
      value: 4
    }
  ]
  return _get(value, list)
}

// 产品类型
export function getDataProductType(value: number | undefined = undefined) {
  const list = [
    {
      label: '数据产品',
      value: 1
    },
    {
      label: '数据服务',
      value: 2
    }
  ]
  return _get(value, list)
}
