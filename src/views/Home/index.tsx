import React, { useEffect } from 'react'
import { HsAdminInput, HsAdminScrollSelect } from '@react-admin/pro-components'
import { getAllUserList } from '@/api/common'

const App: React.FC = () => {
  useEffect(() => {}, [])

  return (
    <div>
      Hello dumi!
      <HsAdminInput defaultValue="Hello dumi!" />
      <HsAdminScrollSelect request={getAllUserList} style={{ width: 240 }}></HsAdminScrollSelect>
      <br />
      <br />
    </div>
  )
}

export default App
