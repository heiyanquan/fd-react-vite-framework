import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Tabs } from 'antd'

const Demo: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [key, setkey] = useState('memo')

  const onChange = (key: string) => {
    navigate(`/hooks/${key}`)
  }
  const items: any[] = [
    {
      key: 'memo',
      label: 'memo'
    },
    {
      key: 'reducer',
      label: 'reducer'
    },
    {
      key: 'ref',
      label: 'ref'
    },
    {
      key: 'context',
      label: 'context'
    },
    {
      key: 'reducerContext',
      label: 'reducerContext'
    },
    {
      key: 'immer',
      label: 'immer'
    },
    {
      key: 'zustand',
      label: 'zustand'
    },
    {
      key: 'zustandContext',
      label: 'zustandContext'
    }
  ]
  useEffect(() => {
    setkey(location.pathname.replace('/hooks/', ''))
  }, [location])

  return (
    <>
      <Tabs activeKey={key} items={items} onChange={onChange} />
      <Outlet></Outlet>
    </>
  )
}

export default Demo
