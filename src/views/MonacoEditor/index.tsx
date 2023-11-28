import { FC, SetStateAction, useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { Select } from 'antd'
import { markdown, markdownLanguage } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'

const MonacoEditor: FC = () => {
  const [value, setValue] = useState("console.log('hello world!');")
  const [selectValue, setselectValue] = useState('javascript')
  const options = [
    { label: 'javascript', value: 'javascript' },
    { label: 'sql', value: 'sql' },
    { label: 'json', value: 'json' },
    { label: 'markdown', value: 'markdown' },
    { label: 'python', value: 'python' }
  ]
  const [extensions, setextensions] = useState([javascript({ jsx: true })])

  const selectChange = (value: any) => {
    console.log('[ value ] >', value)
    setselectValue(value)
    switch (value) {
      case 'javascript':
        setValue("console.log('hello world!');")
        setextensions([javascript({ jsx: true })])
        break
      case 'markdown':
        setValue(`
          # Not dependent on uiw.
          npm install @codemirror/lang-markdown --save
          npm install @codemirror/language-data --save
          [weisit ulr](https://uiwjs.github.io/react-codemirror/)
        `)
        setextensions([markdown({ base: markdownLanguage, codeLanguages: languages })])
        break
      default:
        break
    }
  }
  const onChange = useCallback((val: SetStateAction<string>, viewUpdate: any) => {
    console.log('CodeMirror: onChange', val, viewUpdate)
    setValue(val)
  }, [])
  return (
    <>
      <Select value={selectValue} options={options} onChange={selectChange}></Select>
      <CodeMirror value={value} height="200px" extensions={extensions} onChange={onChange} />
    </>
  )
}

export default MonacoEditor
