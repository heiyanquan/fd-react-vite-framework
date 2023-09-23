import { Select } from 'antd'
import { getAllUserList } from '@/api/common'
import { useState, memo, useEffect, useCallback } from 'react'

const ChildTable = (props: any) => {
  const { options, value } = props
  const [userList, setuserList] = useState<any[]>([])
  const [keywords, setkeywords] = useState<string | undefined>(undefined)
  const [pagination, setPagination] = useState<any>({
    page: 1,
    page_size: 10
  })
  const [localValue, setlocalValue] = useState<string | number | undefined>(undefined)

  const callList = () => {
    return getAllUserList({
      keywords,
      ...pagination
    }).then((res) => {
      if (pagination.page === 1) {
        console.log(22, res)
        setuserList(res)
      } else {
        setuserList((list) => [...list, ...res])
      }
    })
  }

  function getMoreList(e: Event) {
    const currentTarget = e.currentTarget as HTMLElement
    if (currentTarget.scrollTop + currentTarget.offsetHeight - currentTarget.scrollHeight >= -10) {
      setPagination({
        ...pagination,
        page: pagination.page + 1
      })
    }
  }
  const handleSearch = (newValue: string) => {
    setkeywords(newValue)
    setPagination({
      ...pagination,
      page: 1
    })
  }
  const focus = () => {
    setlocalValue('')
    setPagination({
      page: 1,
      page_size: 10
    })
  }

  useEffect(() => {
    callList()
  }, [pagination, keywords])

  useEffect(() => {
    if (options && options.length) {
      console.log(99)
      setuserList(options)
    }
  }, [options])
  useEffect(() => {
    setlocalValue(value)
  }, [value])

  return (
    <Select
      allowClear
      value={localValue}
      options={userList}
      showSearch
      filterOption={false}
      onPopupScroll={getMoreList}
      onSearch={handleSearch}
      onFocus={focus}
      {...props}></Select>
  )
}

export default memo(ChildTable)
