import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Spin } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

const Layout = lazy(() => import('@/views/Layout'))
const Login = lazy(() => import('@/views/Login/Login'))
const Home = lazy(() => import('@/views/Home/Home'))

function withLoading(compnent: JSX.Element) {
  return <Suspense fallback={<Spin />}>{compnent}</Suspense>
}

type ConfigItem<T> = { key: T; label: string; icon: JSX.Element }

function defineConfigs<T extends string>(configs: Array<ConfigItem<T>>) {
  return configs
}

const menuNames = defineConfigs([
  {
    key: 'sub1',
    label: '用户管理',
    icon: <AppstoreOutlined />
  }
])
type menuType = (typeof menuNames)[number]['key']

const subRoutes: Array<{ belong: menuType | ''; name: string; path: string; element: JSX.Element }> = [
  {
    belong: '',
    name: '',
    path: '',
    element: withLoading(<Navigate to="/home" replace />)
  },
  {
    belong: 'sub1',
    name: '账号管理',
    path: 'home',
    element: withLoading(<Home />)
  }
]

const routeChildren = subRoutes.map((item) => ({
  path: item.path,
  element: item.element
}))

const router = createBrowserRouter([
  {
    path: '/',
    element: withLoading(<Layout />),
    children: routeChildren
  },
  {
    path: '/login',
    element: withLoading(<Login />)
  }
])

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export const menuItems: Array<{ label: string; key: string; icon: JSX.Element; children: Array<{ label: string; key: string }> }> = menuNames.map(
  (menu) => {
    const children = subRoutes
      .filter((item) => item.belong === menu.key)
      .map((item) => ({
        label: item.name,
        key: `/${item.path}`
      }))

    return {
      ...menu,
      children
    }
  }
)

export default router
