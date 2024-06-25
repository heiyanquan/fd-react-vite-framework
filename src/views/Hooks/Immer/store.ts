export const initialState = { count: 0, name: 'init name' }

interface ActionType {
  type: string
  name?: string
}
export const reducer = (state: any = initialState, action: ActionType) => {
  switch (action.type) {
    case 'increment':
      state.count = state.count + 1
      break
    case 'decrement':
      state.count = state.count - 1
      break
    case 'setName':
      state.name = action.name
      break
    default:
      throw new Error()
  }
}
