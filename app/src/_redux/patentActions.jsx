/** @format */

import { RSAA } from "redux-api-middleware"
import { toast } from "react-toastify"

const LOAD_REQUEST = "@patent/LOAD_REQUEST"
const LOAD_SUCCESS = "@patent/LOAD_SUCCESS"
const LOAD_FAILURE = "@patent/LOAD_FAILURE"
const CREATE_REQUEST = "@patent/CREATE_REQUEST"
const CREATE_SUCCESS = "@patent/CREATE_SUCCESS"
const CREATE_FAILURE = "@patent/CREATE_FAILURE"
const LOAD_NUMBERS_REQUEST = "@patent/LOAD_NUMBERS_REQUEST"
const LOAD_NUMBERS_SUCCESS = "@patent/LOAD_NUMBERS_SUCCESS"
const LOAD_NUMBERS_FAILURE = "@patent/LOAD_NUMBERS_FAILURE"

// API VARIABLES
const baseURL = "http://localhost/api/v1"
const patentsURL = baseURL + "/patents"
const patentURL = id => patentsURL + "/" + id
const jsonHeader = { "Content-Type": "application/vnd.api+json" }

export const createPatent = (number: number) => ({
  [RSAA]: {
    endpoint: patentsURL,
    method: "POST",
    headers: jsonHeader,
    types: [
      {
        type: CREATE_REQUEST,
        payload: (action, state) => {
          toast.info("Creating Patent")
        },
      },
      {
        type: CREATE_SUCCESS,
        payload: (action, state, res) => {
          toast.success("Patent Created!")
          return res
        },
      },
      {
        type: CREATE_FAILURE,
        payload: (action, state, res) => {
          toast.error("Creation Failed")
          return res
        },
      },
    ],
    body: JSON.stringify({
      data: {
        type: "patents",
        attributes: {
          number: number,
        },
      },
    }),
  },
})

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
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
}
