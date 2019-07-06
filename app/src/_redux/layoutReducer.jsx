/** @format */
// @flow

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./layoutActions"
const { CREATE_TOAST, DELETE_TOAST } = actionRefs

const initialState = {
  toasts: [],
}

export const layoutReducer = createReducer(initialState, {
  //getAllPatent
  [CREATE_TOAST]: (state, action) => ({
    toasts: [...state.toasts, action.payload],
  }),
  [DELETE_TOAST]: (state, action) => {
    return {
      ...state,
      toasts: state.toasts.filter(toast => toast.id !== action.payload),
    }
  },
})
