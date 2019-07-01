/** @format */
// @flow

import { RSAA } from "redux-api-middleware"

const LOAD_REQUEST = "@patent/LOAD_REQUEST"
const LOAD_SUCCESS = "@patent/LOAD_SUCCESS"
const LOAD_FAILURE = "@patent/LOAD_FAILURE"
const SIDELOAD_REQUEST = "@patent/SIDELOAD_REQUEST"
const SIDELOAD_SUCCESS = "@patent/SIDELOAD_SUCCESS"
const SIDELOAD_FAILURE = "@patent/SIDELOAD_REQUEST"
const NEW_ERROR = "@patent/NEW_ERROR"

// API VARIABLES
const baseURL = "localhost/api/v1"
const patentsURL = baseURL + "/patents"
const patentURL = id => patentsURL + "/" + id
const jsonHeader = { "Content-Type": "application/vnd.api+json" }

export const loadData = ({ activePatent }: { activePatent: number }) => ({
  [RSAA]: {
    endpoint: patentURL(activePatent),
    method: "GET",
    headers: jsonHeader,
    types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAILURE],
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
  console.log("FIRE!")
  return (dispatch: ({}) => void) => {
    dispatch(loadData({ activePatent }))
  }
}

export const actions = {
  loadData,
  sideloadRequest,
}

export const actionRefs = {
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
}
