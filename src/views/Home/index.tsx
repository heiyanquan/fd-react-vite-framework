import React, { useEffect } from 'react'
import { HsAdminInput } from '@react-admin/pro-components'
import { usePage } from '@react-admin/pro-utils'
import { getAllUserList } from '@/api/common'

const App: React.FC = () => {
  const callList = () => {
    return getAllUserList({
      page: pagination.current,
      page_size: pagination.page_size
    }).then((res) => {
      return res
    })
  }
  const { pagination } = usePage(callList)

  console.log('[ pagination ] >', pagination)

  useEffect(() => {}, [])

  return (
    <div>
      Hello dumi!
      <HsAdminInput value="Hello dumi!" />
    </div>
  )
}

export default App
