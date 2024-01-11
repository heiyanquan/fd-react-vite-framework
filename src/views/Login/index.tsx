import { Button, message, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './style.less'
import { setItem } from '@/utils/storage'
import { TOKEN, USERRESULT } from '@/utils/constant'
import { codeGetToken, getUserInfo } from '@/api/login'
import { useEffect, useRef } from 'react'

export default function Login() {
  const navigate = useNavigate()
  const hasCode = useRef(false)

  useEffect(() => {
    if (location.href.includes('code=')) {
      hasCode.current = true
      const originQuery: any = location.search!.split('?')[1].split('&')
      const queryArr = originQuery.map((item: any) => item.split('='))
      const query: any = new Map(queryArr)
      codeGetToken({
        code: query.get('code')
      }).then((res) => {
        setItem(TOKEN, res.access_token)
        const p1 = getUserInfo()
        Promise.all([p1])
          .then((res) => {
            setItem(USERRESULT, res[0])
            // location.search = ''
            navigate('/home')
            message.success('登录成功')
          })
          .finally(() => {})
      })
    }
  }, [])

  const submit = () => {
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
  }

  return (
    !hasCode.current && (
      <div className="login-form">
        <br />
        <br />
        <Space align="center">
          <img src="/static/img/logo_only.png" alt="" />
          <h1>火石公域数据系统</h1>
        </Space>
        <br />
        <br />
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={submit}>
          通过第三方登录
        </Button>
      </div>
    )
  )
}
