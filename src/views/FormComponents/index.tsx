import React, { useEffect } from 'react'
import { Input, Select } from 'antd'

const App: React.FC = () => {
  useEffect(() => {}, [])

  return (
    <>
      <Input value="Hello dumi!" />
      <Input value="Hello input!" />
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true }
        ]}
      />
    </>
  )
}

export default App
