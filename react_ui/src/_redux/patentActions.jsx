/** @format */

import { RSAA } from "redux-api-middleware"

const LOAD_REQUEST = "@patent/LOAD_REQUEST"
const LOAD_SUCCESS = "@patent/LOAD_SUCCESS"
const LOAD_FAILURE = "@patent/LOAD_FAILURE"
const LOAD_NUMBERS_REQUEST = "@patent/LOAD_NUMBERS_REQUEST"
const LOAD_NUMBERS_SUCCESS = "@patent/LOAD_NUMBERS_SUCCESS"
const LOAD_NUMBERS_FAILURE = "@patent/LOAD_NUMBERS_FAILURE"

// API VARIABLES
const baseURL = "http://localhost/api/v1"
const patentsURL = baseURL + "/patents"
const patentURL = id => patentsURL + "/" + id
const jsonHeader = { "Content-Type": "application/vnd.api+json" }

export const fetchPatents = () => ({
  [RSAA]: {
    endpoint: patentsURL,
    method: "GET",
    headers: jsonHeader,
    types: [
      { type: LOAD_REQUEST, payload: req => req },
      LOAD_SUCCESS,
      LOAD_FAILURE,
    ],
  },
})

export const fetchPatentNumbers = (searchQuery: string) => ({
  [RSAA]: {
    endpoint: patentsURL,
    method: "GET",
    headers: jsonHeader,
    types: [
      { type: LOAD_NUMBERS_REQUEST, payload: req => req },
      LOAD_NUMBERS_SUCCESS,
      LOAD_NUMBERS_FAILURE,
    ],
    params: { filter: { number: searchQuery.replace(",", "") } },
  },
})

export const actionRefs = {
  LOAD_NUMBERS_REQUEST,
  LOAD_NUMBERS_SUCCESS,
  LOAD_NUMBERS_FAILURE,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
}
