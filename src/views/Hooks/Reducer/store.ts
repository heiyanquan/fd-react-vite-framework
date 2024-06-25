export const initialState = { count: 0, name: 'init name' }

interface ActionType {
  type: string
  name?: string
}
export const reducer = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'setName':
      return { ...state, name: action.name }
    default:
      throw new Error()
  }
}
