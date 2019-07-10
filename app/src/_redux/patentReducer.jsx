/** @format */
// @flow

import { createReducer } from "redux-starter-kit"
import { actionRefs } from "./patentActions"
const {
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
  LOAD_NUMBERS_REQUEST,
  LOAD_NUMBERS_SUCCESS,
  LOAD_NUMBERS_FAILURE,
  LOAD_ALL_REQUEST,
  LOAD_ALL_SUCCESS,
  LOAD_ALL_FAILURE,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} = actionRefs

const initialState = {
  error: [],
  patents: [],
  columns: [],
  patentNumbers: [],
  loading: false,
  apiError: false,
}

export const patentReducer = createReducer(initialState, {
  [LOAD_ALL_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [LOAD_ALL_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    patents: action.payload.data,
  }),
  [LOAD_ALL_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    apiError: true,
    error: action.payload.data,
  }),
  [LOAD_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    activePatent: action.payload.data,
  }),
  [LOAD_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    apiError: true,
    error: action.payload.data,
  }),
  [CREATE_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [CREATE_SUCCESS]: (state, action) => {
    console.log(state, action)
    return {
      ...state,
      loading: false,
      patents: [...state.patents, action.payload.data],
    }
  },
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
  [SIDELOAD_REQUEST]: (state, action) => ({
    ...state,
    loading: true,
  }),
  [SIDELOAD_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    columns: action.payload.data,
  }),
  [SIDELOAD_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    apiError: true,
    error: action.payload.data,
  }),
  [DELETE_REQUEST]: (state, action) => ({ ...state, loading: true }),
  [DELETE_SUCCESS]: (state, action) => {
    console.log(action)
    return {
      ...state,
      loading: false,
      patents: [...state.patents.filter(p => p.id !== action.payload.data.id)],
    }
  },
  [DELETE_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    apiError: true,
    error: action.payload.data,
  }),
})
