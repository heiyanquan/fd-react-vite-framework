import { FC } from 'react'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.less'

const HomePage: FC = () => {
  const navigate = useNavigate()

  const toPage = () => {
    navigate('/router?user=name1', {
      state: {
        params: {
          id: 1
        }
      }
    })
  }

  return (
    <>
      <Space wrap>
        <Button type="primary" onClick={toPage}>
          to router
        </Button>
      </Space>
    </>
  )
}

export default HomePage
