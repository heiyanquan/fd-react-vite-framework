import { useState, memo, useEffect, useMemo } from 'react'
import { Select } from 'antd'
import debounce from 'lodash/debounce'
import { getAllUserList } from '@/api/common'

interface Page {
  page: number
  page_size: number
}
const ChildTable = (props: any) => {
  const { options, value, ...rest } = props
  const [userList, setuserList] = useState<any[]>([])
  const [keywords, setkeywords] = useState<string | undefined>(undefined)
  const [pagination, setPagination] = useState<Page>({
    page: 1,
    page_size: 10
  })
  const [localValue, setlocalValue] = useState<string | number | undefined>(undefined)
  const debounceTimeout = 400

  const callList = () => {
    return getAllUserList({
      keywords,
      ...pagination
    }).then((res) => {
      if (pagination.page === 1) {
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

  const handleSearch = useMemo(() => {
    const loadOptions = (newValue: string) => {
      setkeywords(newValue)
      setPagination((pagi) => ({
        ...pagi,
        page: 1
      }))
    }

    return debounce(loadOptions, debounceTimeout)
  }, [debounceTimeout])

  const focus = () => {
    setPagination({
      page: 1,
      page_size: 10
    })
  }
  const blur = () => {
    setuserList(options)
  }

  useEffect(() => {
    callList()
  }, [pagination, keywords])

  useEffect(() => {
    if (options && options.length) {
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
      onBlur={blur}
      {...rest}></Select>
  )
}

export default memo(ChildTable)
