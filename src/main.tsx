import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, Spin } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'virtual:uno.css'
import 'antd/dist/reset.css'
import '@/styles/index.less'
import router from './router'

dayjs.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router} fallbackElement={<Spin />} />
    </ConfigProvider>
  </React.StrictMode>
)
