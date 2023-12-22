import React, { SetStateAction, useEffect, useState } from 'react'
import { HsAdminInput, HsAdminScrollSelect, HsAdminCodemirror } from '@react-admin/pro-components'
import { getAllUserList } from '@/api/common'

const App: React.FC = () => {
  const [code, setCode] = useState('')
  const [allModuleTxt, setallModuleTxt] = useState<any>({})

  const langChange = (lang: any) => {
    console.log('[ lang ] >', lang)
    for (const path in allModuleTxt) {
      if (path.includes(lang)) {
        allModuleTxt[path]().then((res: SetStateAction<string>) => {
          setCode(res)
        })
      }
    }
  }
  const codemirrorChange = (val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate)
    setCode(val)
  }

  useEffect(() => {
    const modules = import.meta.glob('/node_modules/code-example/txt/sample.*.txt', { as: 'raw' })
    setallModuleTxt(modules)
  }, [])

  return (
    <div>
      Hello dumi!
      <HsAdminInput value="Hello dumi!" />
      <HsAdminScrollSelect request={getAllUserList} style={{ width: 240 }}></HsAdminScrollSelect>
      <br />
      <br />
      <HsAdminCodemirror value={code} setValue={setCode} height="300px" onLangChange={langChange} onChange={codemirrorChange} />
    </div>
  )
}

export default App
