/** @format */
// @flow

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./patentActions"
const { LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE } = actionRefs

const initialState = {
  patents: [],
  loading: false,
  loadingError: false,
}

export const patentReducer = createReducer(initialState, {
  //getAllPatent
  [LOAD_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    patents: action.payload.data,
  }),
  [LOAD_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loadingError: true,
  }),
})
