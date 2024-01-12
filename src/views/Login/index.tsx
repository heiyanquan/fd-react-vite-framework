import { Button, Space } from 'antd'
import './style.less'
import { useRef } from 'react'

export default function Login() {
  const hasCode = useRef(false)

  const paramsMap: any = new Map([
    ['client_id', '32248183-5707-42a6-a761-89eebebbdc1f'],
    ['redirect_uri', encodeURIComponent(window.location.href)],
    ['scope', 'user.profile'],
    ['response_type', 'code']
  ])
  let query = ''
  for (const key of paramsMap.keys()) {
    query += `${key}=${paramsMap.get(key)}&`
  }
  query = query.slice(0, -1)
  window.location.href = `${import.meta.env.VITE_USER_CENTER_URL}/#/authorize?${query}`

  return (
    !hasCode.current && (
      <div className="login-form">
        <br />
        <br />
        <Space align="center">
          <img src="/static/img/logo_only.png" alt="" />
          <h1>火石公域数据系统</h1>
        </Space>
      </div>
    )
  )
}
