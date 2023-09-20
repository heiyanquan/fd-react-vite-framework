import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface MenuState {
  label: string
  key: string
}

const initialState: MenuState = {
  label: '',
  key: ''
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<MenuState>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.label = action.payload.label
      state.key = action.payload.key
    }
  }
})

// Action creators are generated for each case reducer function
export const { update } = menuSlice.actions

export default menuSlice.reducer
