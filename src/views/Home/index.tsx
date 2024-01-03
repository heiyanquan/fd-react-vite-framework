import React, { useEffect } from 'react'
import { HsAdminInput, HsAdminScrollSelect } from '@react-admin/pro-components'
import { getAllUserList } from '@/api/common'
import { Spin } from 'react-company'

const App: React.FC = () => {
  useEffect(() => {}, [])

  return (
    <div>
      Hello dumi!
      <HsAdminInput defaultValue="Hello dumi!" />
      <HsAdminScrollSelect request={getAllUserList} style={{ width: 240 }}></HsAdminScrollSelect>
      <br />
      <br />
      <Spin name="name1" />
      <Spin name="正在加载中" />
    </div>
  )
}

export default App
