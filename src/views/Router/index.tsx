import { Button, Space } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import './style.less'

const RouterPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()

  console.log('location', location)
  console.log('searchParams', searchParams.get('user'))

  const toPage = () => {
    navigate('/home', {
      state: {
        params: {
          id: 2
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

export default RouterPage
