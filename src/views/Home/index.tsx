import React, { SetStateAction, useEffect, useState } from 'react'
import { HsAdminInput, HsAdminScrollSelect } from '@react-admin/pro-components'
import { HsAdminCodemirror } from '@react-admin/pro-codemirror'
import { getAllUserList } from '@/api/common'

const App: React.FC = () => {
  const [code, setCode] = useState('')

  const codemirrorChange = (val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate)
    setCode(val)
  }

  useEffect(() => {}, [])

  return (
    <div>
      Hello dumi!
      <HsAdminInput value="Hello dumi!" />
      <HsAdminScrollSelect request={getAllUserList} style={{ width: 240 }}></HsAdminScrollSelect>
      <br />
      <br />
      <HsAdminCodemirror value={code} setValue={setCode} height="300px" onChange={codemirrorChange} />
    </div>
  )
}

export default App
