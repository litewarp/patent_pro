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
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
} = actionRefs

const initialState = {
  error: [],
  patents: [],
  patentNumbers: [],
  loading: false,
  apiError: false,
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
    apiError: true,
    error: action.payload.data,
  }),
  [CREATE_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [CREATE_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    patents: [...state.patents, action.payload.data],
  }),
  [CREATE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    apiError: true,
    error: action.payload.data,
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
    apiError: true,
    error: action.payload.data,
  }),
})
