import React, { useEffect, useState, memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useDispatch } from 'react-redux'
import { update } from '@/store/modules/menuSlice'
import { menuItems } from '@/router'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

// item数据格式：getItem('用户管理', 'sub1', <AppstoreOutlined />, [getItem('账号管理', '/home')])
const items: MenuProps['items'] = menuItems.map((item) => {
  const children = item.children.map((child) => getItem(child.label, child.key))
  return getItem(item.label, item.key, item.icon, children)
})

function MenuView() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const selectedKeys = [location.pathname]
  const [openKeys, setOpenKeys] = useState(['sub1'])
  const onOpenChange: MenuProps['onOpenChange'] = (keys: string[]) => {
    setOpenKeys([keys[1]])
  }
  useEffect(() => {
    menuItems.forEach((first) => {
      first.children.forEach((second) => {
        if (second.key === location.pathname) {
          dispatch(update(second))
          setOpenKeys([first.key])
        }
      })
    })
  }, [location])

  const onClick: MenuProps['onClick'] = (e) => {
    setOpenKeys([e.keyPath[1]])
    navigate(e.key)
  }
  return <Menu onClick={onClick} selectedKeys={selectedKeys} openKeys={openKeys} mode="inline" items={items} onOpenChange={onOpenChange} />
}

export default memo(MenuView)
