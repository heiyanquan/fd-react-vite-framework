import { FC, useEffect } from 'react'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.less'
import { initChart } from './chart'

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

  useEffect(() => {
    initChart()
  }, [])

  return (
    <>
      <Space wrap>
        <Button type="primary" onClick={toPage}>
          to router
        </Button>
      </Space>
      <div className="chart" id="main"></div>
    </>
  )
}

export default HomePage
