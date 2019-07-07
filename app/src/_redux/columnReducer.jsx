/** @format */

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./columnActions"
const {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  LOAD_LINES_REQUEST,
  LOAD_LINES_SUCCESS,
  LOAD_LINES_FAILURE,
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
  SET_ACTIVE_COLUMN,
} = actionRefs

const initialState = {
  activePatent: {},
  activeColumn: 1,
  loading: false,
  loadingError: false,
  columns: [],
  lines: [],
}

const replaceItemInArray = (payload, patents) => {
  return patents.map((item, index) => {
    if (item.id !== payload.id) {
      return item
    }
    return payload
  })
}

export const columnReducer = createReducer(initialState, {
  //getAllPatent
  [LOAD_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    activePatent: action.payload.data,
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
    columns: action.payload.data,
  }),
  [SIDELOAD_FAILURE]: (state, action) => ({ ...state }),
  [LOAD_LINES_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [LOAD_LINES_SUCCESS]: (state, action) => ({
    ...state,
    lines: action.payload.data,
  }),
  [LOAD_LINES_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loadingError: true,
  }),
  [SET_ACTIVE_COLUMN]: (state, action) => ({
    ...state,
    activeColumn: action.payload,
  }),
})
