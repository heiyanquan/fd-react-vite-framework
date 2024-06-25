import React, { useContext, useState, createContext } from 'react'
import { Button } from 'antd'

const StateContext = createContext(null)

const EditModal = () => {
  const state = useContext<any>(StateContext)

  return <div>子组件接收过来的数据 {state.msg}</div>
}

const ContextPage: React.FC = () => {
  const [state, setState] = useState<any>({
    msg: 'init msg'
  })
  const onClick = () => setState((prevState: any) => ({ ...prevState, msg: 'change msg' + new Date().valueOf() }))

  return (
    <>
      <h1>父组件的数据{state.msg}</h1>
      <Button type="primary" onClick={onClick}>
        父组件点击更新数据
      </Button>
      <StateContext.Provider value={state}>
        <EditModal />
      </StateContext.Provider>
    </>
  )
}

export default ContextPage
