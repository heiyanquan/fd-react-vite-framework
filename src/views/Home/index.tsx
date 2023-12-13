import { FC } from 'react'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.less'
import { HsAdminInput } from 'hs-react-admin'

const HomePage: FC = () => {
  const navigate = useNavigate()
  console.log('[ HsAdminInput ] >', HsAdminInput)

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
        <HsAdminInput value="Hello dumi!" />
      </Space>
    </>
  )
}

export default HomePage
