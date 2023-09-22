import dayjs from 'dayjs'

const emptyText = '--'

export function hsHandleTableRender(text: string) {
  return text || emptyText
}
export function hsHandleDateYear(timestamp: number | string) {
  let date = emptyText
  if (timestamp) {
    date = dayjs(timestamp).format('YYYY')
  }
  return date
}
export function hsHandleTableDate(timestamp: number | string) {
  let date = emptyText
  if (timestamp) {
    date = dayjs(timestamp).format('YYYY-MM-DD')
  }
  return date
}
export function hsHandleTableDateTime(timestamp: number | string) {
  let date = emptyText
  if (timestamp) {
    date = dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
  return date
}
