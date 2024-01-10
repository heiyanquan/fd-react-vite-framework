import { Resizable } from 'react-resizable'
import './style.less'

const ResizableTitle = (props: { [x: string]: any; onResize: any; width: any }) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}>
      <th {...restProps} />
    </Resizable>
  )
}
export default ResizableTitle
