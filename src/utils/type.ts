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
