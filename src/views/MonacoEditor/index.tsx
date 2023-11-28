import { FC, SetStateAction, useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { Select } from 'antd'

const MonacoEditor: FC = () => {
  const [value, setValue] = useState("console.log('hello world!');")
  const options = useState([
    { label: 'javascript', value: 'javascript' },
    { label: 'sql', value: 'sql' },
    { label: 'json', value: 'json' },
    { label: 'markdown', value: 'markdown' },
    { label: 'python', value: 'python' }
  ])
  const [extensions, setextensions] = useState([javascript({ jsx: true })])

  const selectChange = (value: any) => {
    console.log('[ value ] >', value)
    switch (value) {
      case 'javascript':
        setextensions([javascript({ jsx: true })])
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
      <Select options={options} onChange={selectChange}></Select>
      <CodeMirror value={value} height="200px" extensions={extensions} onChange={onChange} />
    </>
  )
}

export default MonacoEditor
