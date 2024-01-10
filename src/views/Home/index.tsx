import React, { useState } from 'react'
import { HsAdminScrollSelect } from '@react-admin/pro-components'
import { getAllUserList } from '@/api/common'
import { Spin } from 'react-company'
import './style.less'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'

const App: React.FC = () => {
  const [state, setState] = useState({ width: 200, height: 200 })
  const onResize = (_event: any, { size }: any) => {
    setState({ width: size.width, height: size.height })
  }

  return (
    <div className="home-page-wrapper">
      <HsAdminScrollSelect request={getAllUserList} style={{ width: 240 }}></HsAdminScrollSelect>
      <br />
      <Spin name="name1" />
      <Resizable height={state.height} width={state.width} onResize={onResize}>
        <div className="box1" style={{ width: state.width + 'px', height: state.height + 'px' }}>
          <span>Contents</span>
        </div>
      </Resizable>
    </div>
  )
}

export default App
