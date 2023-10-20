import { create } from 'zustand'

type State = {
  count: number
}

type Actions = {
  increment: (qty: number) => void
  decrement: (qty: number) => void
}

const initialState = (set: {
  (
    partial: (State & Actions) | Partial<State & Actions> | ((state: State & Actions) => (State & Actions) | Partial<State & Actions>),
    replace?: boolean | undefined
  ): void
  (
    partial: (State & Actions) | Partial<State & Actions> | ((state: State & Actions) => (State & Actions) | Partial<State & Actions>),
    replace?: boolean | undefined
  ): void
  (arg0: { (state: any): { count: any }; (state: any): { count: number } }): any
}) => ({
  count: 0,
  increment: (qty: number) => set((state: { count: number }) => ({ count: state.count + qty })),
  decrement: (qty: number) => set((state: { count: number }) => ({ count: state.count - qty }))
})

export const useCountStore = create<State & Actions>((set) => initialState(set))
export const useCountStore2 = create<State & Actions>((set) => initialState(set))
