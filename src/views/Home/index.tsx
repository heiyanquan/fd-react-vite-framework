import { FC, useState, useEffect } from 'react'
import { Button, Spin } from 'antd'

const HomePage: FC = () => {
  const [status, setStatus] = useState('loading')
  const onChange = () => {
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
    }, 3000)
  }

  useEffect(() => {
    setTimeout(() => {
      setStatus('success')
    }, 3000)
  }, [])

  return (
    <>
      {status === 'loading' && <Spin />}
      {status === 'success' && (
        <Button type="primary" onClick={onChange}>
          Primary Button
        </Button>
      )}
    </>
  )
}

export default HomePage
