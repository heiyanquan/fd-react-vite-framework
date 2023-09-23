import { memo, useMemo } from 'react'
import { Select } from 'antd'
import debounce from 'lodash/debounce'

const SelectUsers = (props: any) => {
  const debounceTimeout = 400

  const filterOption: any = (input: string, option: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const handleSearch = useMemo(() => {
    if (props.onSearch) {
      return debounce(props.onSearch, debounceTimeout)
    }
  }, [debounceTimeout])

  return <Select allowClear showSearch filterOption={filterOption} onSearch={handleSearch} {...props}></Select>
}

export default memo(SelectUsers)
