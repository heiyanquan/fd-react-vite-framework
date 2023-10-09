import { useState, useEffect } from 'react'
import { useImmer } from 'use-immer'

interface SetStatePage {
  current: number
  pageSize: number
  showSizeChanger: boolean
  showQuickJumper: boolean
  pageSizeOptions: number[]
  showTotal: (total: number) => string
}

export const usePage: any = (doRequest?: () => Promise<any>, initOptions?: SetStatePage) => {
  const [pagination, setPagination] = useImmer<SetStatePage>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number) => `共 ${total} 条数据`,
    pageSizeOptions: [10, 20, 30, 40],
    ...initOptions
  })
  const [total, setTotal] = useState(0)

  function onChange(page: number, pageSize: number) {
    if (pageSize !== pagination.pageSize) {
      setPagination((prevPagi) => {
        prevPagi.current = 1
        prevPagi.pageSize = pageSize
      })
    } else {
      setPagination((prevPagi) => {
        prevPagi.current = page
      })
    }
  }

  const resetPage = () => {
    setPagination((prevPagi) => {
      prevPagi.current = 1
      prevPagi.pageSize = 10
    })
  }

  useEffect(() => {
    if (doRequest) {
      doRequest().then((res) => {
        if (typeof res === 'object') {
          setTotal(res.total)
        }
      })
    }
  }, [pagination])

  return {
    pagination: {
      ...pagination,
      total,
      onChange
    },
    total,
    setPagination,
    setTotal,
    onChange,
    resetPage
  }
}
