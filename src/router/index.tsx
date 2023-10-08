import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom'
import { Spin } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'

const Layout = lazy(() => import('@/views/Layout'))
const Login = lazy(() => import('@/views/Login'))
const Home = lazy(() => import('@/views/Home'))
const Router = lazy(() => import('@/views/Router'))
const Table = lazy(() => import('@/views/Table'))
const Form = lazy(() => import('@/views/Form'))
const Hooks = lazy(() => import('@/views/Hooks'))
const HooksMemo = lazy(() => import('@/views/Hooks/Memo'))
const Reducer = lazy(() => import('@/views/Hooks/Reducer'))
const Ref = lazy(() => import('@/views/Hooks/Ref'))
const Context = lazy(() => import('@/views/Hooks/Context'))
const ReducerContext = lazy(() => import('@/views/Hooks/ReducerContext'))
const Immer = lazy(() => import('@/views/Hooks/Immer'))
const Zustand = lazy(() => import('@/views/Hooks/Zustand'))
const ZustandIndependent = lazy(() => import('@/views/Hooks/ZustandIndependent'))

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
    label: '菜单一',
    icon: <AppstoreOutlined />
  }
])
type menuType = (typeof menuNames)[number]['key']
type CustomRouteConfig = RouteObject & {
  belong?: menuType | ''
  name: string
  children?: CustomRouteConfig[]
}

const routeChildren: CustomRouteConfig[] = [
  {
    belong: '',
    name: '',
    path: '',
    element: withLoading(<Navigate to="/form" replace />)
  },
  {
    belong: 'sub1',
    name: 'home',
    path: 'home',
    element: withLoading(<Home />)
  },
  {
    belong: 'sub1',
    name: 'router',
    path: 'router',
    element: withLoading(<Router />)
  },
  {
    belong: 'sub1',
    name: 'table',
    path: 'table',
    element: withLoading(<Table />)
  },
  {
    belong: 'sub1',
    name: 'form',
    path: 'form',
    element: withLoading(<Form />)
  },
  {
    belong: 'sub1',
    name: 'hooks',
    path: 'hooks',
    element: withLoading(<Hooks />),
    children: [
      {
        name: '',
        path: '',
        element: withLoading(<Navigate to="/hooks/memo" replace />)
      },
      {
        name: 'memo',
        path: 'memo',
        element: withLoading(<HooksMemo />)
      },
      {
        name: 'reducer',
        path: 'reducer',
        element: withLoading(<Reducer />)
      },
      {
        name: 'ref',
        path: 'ref',
        element: withLoading(<Ref />)
      },
      {
        name: 'context',
        path: 'context',
        element: withLoading(<Context />)
      },
      {
        name: 'reducerContext',
        path: 'reducerContext',
        element: withLoading(<ReducerContext />)
      },
      {
        name: 'immer',
        path: 'immer',
        element: withLoading(<Immer />)
      },
      {
        name: 'zustand',
        path: 'zustand',
        element: withLoading(<Zustand />)
      },
      {
        name: 'zustandContext',
        path: 'zustandContext',
        element: withLoading(<ZustandIndependent />)
      }
    ]
  }
]

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
    const children = routeChildren
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
