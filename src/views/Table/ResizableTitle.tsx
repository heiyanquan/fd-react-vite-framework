import { Resizable } from 'react-resizable'
import './style.less'
import { memo } from 'react'

const ResizableTitle = (props: { [x: string]: any; onResize: any; width: number }) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }
  return (
    <Resizable width={width} height={0} onResize={onResize} draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  )
}
export default memo(ResizableTitle)
