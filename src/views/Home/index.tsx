import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.less'

function HomePage() {
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
    <Space wrap>
      <Button type="primary" onClick={toPage}>
        Primary Button
      </Button>
      <Button>Default Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
  )
}

export default HomePage
