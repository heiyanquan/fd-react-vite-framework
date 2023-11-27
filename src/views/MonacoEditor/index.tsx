import { FC, useCallback, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

const MonacoEditor: FC = () => {
  const [value, setValue] = useState("console.log('hello world!');")
  const onChange = useCallback((val, viewUpdate) => {
    console.log('val:', val)
    setValue(val)
  }, [])
  return (
    <>
      <CodeMirror value={value} height="200px" extensions={[javascript({ jsx: true })]} onChange={onChange} />
    </>
  )
}

export default MonacoEditor
