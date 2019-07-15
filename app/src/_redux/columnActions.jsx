/** @format */
// @flow

import { RSAA } from "redux-api-middleware"
import { loadPatent } from "./patentActions.jsx"
const LOAD_LINES_REQUEST = "@column/LOAD_LINES_REQUEST"
const LOAD_LINES_SUCCESS = "@column/LOAD_LINES_SUCCESS"
const LOAD_LINES_FAILURE = "@column/LOAD_LINES_FAILURE"

const NEW_ERROR = "@column/NEW_ERROR"
const SET_ACTIVE_COLUMN = "@column/SET_ACTIVE_COLUMN"

// API VARIABLES
const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://mccoybot.com/api/v1"
    : "http://localhost/api/v1"

const patentsURL = baseURL + "/columns"
const patentURL = id => patentsURL + "/" + id
const jsonHeader = { "Content-Type": "application/vnd.api+json" }

export const setActiveColumn = (column: number) => ({
  type: SET_ACTIVE_COLUMN,
  payload: column,
})

export const fetchLines = (columnId: number) => ({
  [RSAA]: {
    endpoint: `${baseURL}/lines?filter[column_id]=${columnId}`,
    method: "GET",
    headers: jsonHeader,
    types: [
      {
        type: LOAD_LINES_REQUEST,
        payload: req => req,
      },
      LOAD_LINES_SUCCESS,
      LOAD_LINES_FAILURE,
    ],
  },
})

export const actions = {
  setActiveColumn,
  fetchLines,
}

export const actionRefs = {
  LOAD_LINES_REQUEST,
  LOAD_LINES_SUCCESS,
  LOAD_LINES_FAILURE,
  SET_ACTIVE_COLUMN,
}
