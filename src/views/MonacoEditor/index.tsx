import { FC, SetStateAction, useCallback, useEffect, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { Select } from 'antd'
import { langs } from './langs'
import { color } from '@uiw/codemirror-extensions-color'

const MonacoEditor: FC = () => {
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<string>('')
  const options = [
    { label: 'javascript', value: 'javascript' },
    { label: 'sql', value: 'sql' },
    { label: 'json', value: 'json' },
    { label: 'markdown', value: 'markdown' },
    { label: 'python', value: 'python' }
  ]
  const [extensions, setExtensions] = useState<any[]>()
  const [allModuleTxt, setallModuleTxt] = useState<any>({})

  function handleLangChange(lang: keyof typeof langs) {
    for (const path in allModuleTxt) {
      if (path.includes(lang)) {
        allModuleTxt[path]().then((res: SetStateAction<string>) => {
          setCode(res)
        })
        if (langs[lang]) {
          setExtensions([color, langs[lang]()])
        }
        setMode(lang)
      }
    }
  }
  const onChange = useCallback((val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate)
  }, [])

  useEffect(() => {
    const modules = import.meta.glob('/node_modules/code-example/txt/sample.*.txt', { as: 'raw' })
    setallModuleTxt(modules)
  }, [])

  return (
    <>
      <Select value={mode} options={options} onChange={handleLangChange}></Select>
      <CodeMirror value={code} height="600px" extensions={extensions} onChange={onChange} />
    </>
  )
}

export default MonacoEditor
