/** @format */

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./actions"
const {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
} = actionRefs

const initialState = {
  activeCase: {},
  document: {},
  loading: false,
  judges: [],
  parties: [],
}

const replaceItemInArray = (payload, cases) => {
  return cases.map((item, index) => {
    if (item.id !== payload.id) {
      return item
    }
    return payload
  })
}

export const casesReducer = createReducer(initialState, {
  //getAllCase
  [LOAD_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    activeCase: action.payload.data,
  }),
  [LOAD_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loadingError: true,
  }),

  //sideLoad related
  [SIDELOAD_REQUEST]: (state, action) => ({ ...state }),
  [SIDELOAD_SUCCESS]: (state, action) => ({
    ...state,
    document: action.payload.data[0],
  }),
  [SIDELOAD_FAILURE]: (state, action) => ({ ...state }),
})
