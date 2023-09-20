import { useState } from 'react'

/**
 *
 * @param initPage:{showSizeChanger:是否展示pageSize切换器，默认否；pageSize：默认10}
 * @param doRequest
 */
export const usePageChange = (
  initPage: { current: number; total: number; pageSize?: number; showSizeChanger?: boolean },
  doRequest: (page: number, pageSize?: number) => Promise<Awaited<number>>
) => {
  const [pagination, setPagination] = useState({ ...initPage, showSizeChanger: !!initPage.showSizeChanger, pageSize: initPage.pageSize ?? 10 })
  const handleChange = (newPage: number, newPageSize?: number) => {
    const currentTotal = pagination.total
    setPagination({
      ...pagination,
      pageSize: newPageSize ?? pagination.pageSize,
      current: newPage
    })
    doRequest(newPage, newPageSize)
      .then((totalNum) => {
        if (totalNum !== currentTotal) {
          setPagination((page) => ({
            ...page,
            total: totalNum
          }))
        }
      })
      .catch((e) => {
        console.log(e)
        if (currentTotal !== 0) {
          setPagination((page) => ({
            ...page,
            total: 0
          }))
        }
      })
  }
  return {
    pagination: {
      ...pagination,
      onChange: handleChange
    },
    handleChange
  }
}
