import { Button } from 'antd'
import { useState, memo, useMemo, useCallback } from 'react'

const NormalChild: React.FC = () => {
  console.log('render normal child-comp ...')
  return <h1>Normal Child</h1>
}

const MemoChild: React.FC = memo(() => {
  console.log('render memo child-comp ...')
  return <h1>Memo Child</h1>
})

const NoUseMemoChild: React.FC<{ state: any }> = memo(({ state }) => {
  console.log('render no useMemo child-comp ...')
  return <h1>No useMemo Child {state.name}</h1>
})

const UseMemoChild: React.FC<{ state: any }> = memo(({ state }) => {
  console.log('render useMemo child-comp ...')
  return <h1>useMemo Child {state.name}</h1>
})

const NoUseCallbackChild: React.FC<{ changeName: any }> = memo(({ changeName }) => {
  console.log('render no useCallback child-comp ...', changeName)
  return <h1>No useCallback Child</h1>
})

const UseCallbackChild: React.FC<{ changeName: any }> = memo(({ changeName }) => {
  console.log('render useCallback child-comp ...', changeName)
  return <h1>useCallback Child</h1>
})

const Parent: React.FC = () => {
  const [msg, setMsg] = useState('init msg')
  const [name, setName] = useState('init name')
  const state = {
    name: 'init state name',
    type: 1
  }
  const memoState = useMemo(
    () => ({
      name: 'init memoState name',
      type: 1
    }),
    []
  )
  const changeMsg = () => {
    setMsg('change msg')
  }
  const changeName = () => {
    setName('change name')
  }
  const useChangeName = useCallback(() => {
    setName('change name')
  }, [])
  console.log('render parent comp ...')

  return (
    <>
      <Button type="primary" onClick={changeMsg}>
        change msg
      </Button>
      <br />
      <br />
      <Button type="primary" onClick={changeName}>
        change name
      </Button>
      <h1>{msg}</h1>
      <h2>{name}</h2>
      <NormalChild />
      <MemoChild />
      <NoUseMemoChild state={state} />
      <UseMemoChild state={memoState} />
      <NoUseCallbackChild changeName={changeName} />
      <UseCallbackChild changeName={useChangeName} />
    </>
  )
}

export default Parent
