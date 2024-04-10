import { Outlet, useNavigate } from 'react-router-dom'
import { Layout, Row, Dropdown, Avatar, Space, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import Menu from '@/components/Menu/Menu'
import './LayoutStyle.less'
import { useEffect } from 'react'

const { Sider } = Layout

function LayoutView() {
  const navigate = useNavigate()
  // u should call navigate() in a React.useEffect(), not when your component is first rendered.
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  }, [])

  const logout = () => {
    window.localStorage.clear()
    navigate('/login')
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Button className="logout-btn" type="link" onClick={logout}>
          退出
        </Button>
      )
    }
  ]

  return (
    <Layout>
      <Sider theme="light">
        <br />
        <Row align="middle" justify="space-around">
          <Space>
            <img className="left-sider-logo" src="/static/img/logo_only.png" alt="" />
            <h1 className="left-sider-logo-text">火石公域数据订单系统</h1>
          </Space>
        </Row>
        <br />
        <Dropdown menu={{ items }}>
          <Row justify="start" align="middle">
            <Space className="user-name-row">
              <Avatar icon={<UserOutlined />} />
              admin
              <DownOutlined />
            </Space>
          </Row>
        </Dropdown>
        <br />
        <Menu />
      </Sider>
      <Layout className="right-content">
        <div className="bread-list"></div>
        <Outlet />
      </Layout>
    </Layout>
  )
}

export default LayoutView
