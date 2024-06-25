declare interface messageInfor {
  load?: Function
}

declare interface Window {
  $message: any
  $loading: any
}

declare interface labelItem {
  label: string
  value: string | number | undefined
  parent?: string
  active?: boolean
  children?: labelItem[]
}

interface SelectOption {
  label: string
  value: string
}
declare type FilterFunc = (value: SelectOption) => boolean
