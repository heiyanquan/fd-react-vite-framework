import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, Spin, App } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'antd/dist/reset.css'
import '@/styles/index.less'
import { Provider } from 'react-redux'
import { store } from './store'
import router from './router'
import { StaticMethod } from '@react-admin/pro-utils'

dayjs.locale('zh-cn')
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App>
          <StaticMethod />
          <RouterProvider router={router} fallbackElement={<Spin />} />
        </App>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>
)
