import { memo } from 'react'
import { Input } from 'antd'

const HsAdminInput = (props: any) => {
  const { TextArea, ...rest } = props
  if (TextArea) {
    return <Input.TextArea allowClear showCount maxLength={500} {...rest}></Input.TextArea>
  } else {
    return <Input allowClear showCount maxLength={50} {...rest}></Input>
  }
}

export default memo(HsAdminInput)
