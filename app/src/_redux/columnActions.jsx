/** @format */
// @flow

import { RSAA } from "redux-api-middleware"
import { loadPatent } from "./patentActions.jsx"
const LOAD_LINES_REQUEST = "@column/LOAD_LINES_REQUEST"
const LOAD_LINES_SUCCESS = "@column/LOAD_LINES_SUCCESS"
const LOAD_LINES_FAILURE = "@column/LOAD_LINES_FAILURE"
const SIDELOAD_REQUEST = "@column/SIDELOAD_REQUEST"
const SIDELOAD_SUCCESS = "@column/SIDELOAD_SUCCESS"
const SIDELOAD_FAILURE = "@column/SIDELOAD_REQUEST"
const NEW_ERROR = "@column/NEW_ERROR"
const SET_ACTIVE_COLUMN = "@column/SET_ACTIVE_COLUMN"

// API VARIABLES
const baseURL = "http://localhost/api/v1"
const patentsURL = baseURL + "/patents"
const patentURL = id => patentsURL + "/" + id
const jsonHeader = { "Content-Type": "application/vnd.api+json" }

export const setActiveColumn = (column: number) => ({
  type: SET_ACTIVE_COLUMN,
  payload: column,
})

export const fetchLines = (columnId: number) => ({
  [RSAA]: {
    endpoint: `http://localhost/api/v1/lines?filter[column_id]=${columnId}`,
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

const sideloadRequest = (docLink: string) => ({
  [RSAA]: {
    endpoint: docLink,
    method: "GET",
    types: [SIDELOAD_REQUEST, SIDELOAD_SUCCESS, SIDELOAD_FAILURE],
  },
})

export const fetchColumns = ({
  activePatent,
  column,
}: {
  activePatent: number,
  column: number,
}) => {
  const formatUrl = url => {
    const splitUrl = url.split("/")
    splitUrl.shift()
    return process.env.NODE_ENV === "production"
      ? "http://sethipc.com/" + splitUrl.join("/")
      : "http://localhost/" + splitUrl.join("/")
  }
  return (dispatch: ({}) => void, getState: () => void) => {
    dispatch(loadPatent({ activePatent }))
      .then(res => {
        const prefix = "http://"
        const newState = getState()
        console.log(newState)
        const { columns } = newState.column.activePatent.relationships
        dispatch(sideloadRequest(formatUrl(columns.links.related)))
      })
      .catch(err => {
        console.log(err)
        return err
      })
  }
}

export const actions = {
  sideloadRequest,
}

export const actionRefs = {
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
  LOAD_LINES_REQUEST,
  LOAD_LINES_SUCCESS,
  LOAD_LINES_FAILURE,
  SET_ACTIVE_COLUMN,
}
