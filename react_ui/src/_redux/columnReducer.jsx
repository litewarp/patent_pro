/** @format */

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./columnActions"
const {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
} = actionRefs

const initialState = {
  activePatent: "7629705",
  activeColumn: 1,
  loading: false,
  columns: [],
  columnImages: [],
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
})
