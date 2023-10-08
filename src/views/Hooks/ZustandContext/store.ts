import { createContext } from 'react'
import { createStore } from 'zustand'

export const StoreContext = createContext(null)

export const storeRef = createStore((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 })
}))
