import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'antd'

const EditModal = forwardRef((_props, ref) => {
  const showModal = () => {
    console.log('showModal')
  }
  useImperativeHandle(
    ref,
    () => {
      return {
        showModal
      }
    },
    []
  )

  return <div>子组件</div>
})

const RefPage: React.FC = () => {
  const editRef = useRef<any>(null)
  const onClick = () => {
    console.log('editRef', editRef.current)
  }

  return (
    <>
      <Button type="primary" onClick={onClick}>
        点击查看子组件抛出的属性和方法
      </Button>
      <EditModal ref={editRef} />
    </>
  )
}

export default RefPage
