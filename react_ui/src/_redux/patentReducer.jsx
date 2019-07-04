/** @format */
// @flow

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./patentActions"
const {
  LOAD_NUMBERS_REQUEST,
  LOAD_NUMBERS_SUCCESS,
  LOAD_NUMBERS_FAILURE,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
} = actionRefs

const initialState = {
  patents: [],
  patentNumbers: [],
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
  [LOAD_NUMBERS_REQUEST]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [LOAD_NUMBERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    patentNumbers: action.payload.data,
  }),
  [LOAD_NUMBERS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    loadingError: true,
  }),
})
