/** @format */

import { RSAA } from "redux-api-middleware"
import { toast } from "react-toastify"

const LOAD_REQUEST = "@patent/LOAD_REQUEST"
const LOAD_SUCCESS = "@patent/LOAD_SUCCESS"
const LOAD_FAILURE = "@patent/LOAD_FAILURE"
const LOAD_ALL_REQUEST = "@patent/LOAD_ALL_REQUEST"
const LOAD_ALL_SUCCESS = "@patent/LOAD_ALL_SUCCESS"
const LOAD_ALL_FAILURE = "@patent/LOAD_ALL_FAILURE"
const CREATE_REQUEST = "@patent/CREATE_REQUEST"
const CREATE_SUCCESS = "@patent/CREATE_SUCCESS"
const CREATE_FAILURE = "@patent/CREATE_FAILURE"
const LOAD_NUMBERS_REQUEST = "@patent/LOAD_NUMBERS_REQUEST"
const LOAD_NUMBERS_SUCCESS = "@patent/LOAD_NUMBERS_SUCCESS"
const LOAD_NUMBERS_FAILURE = "@patent/LOAD_NUMBERS_FAILURE"
const SIDELOAD_REQUEST = "@patent/SIDELOAD_REQUEST"
const SIDELOAD_SUCCESS = "@patent/SIDELOAD_SUCCESS"
const SIDELOAD_FAILURE = "@patent/SIDELOAD_REQUEST"
// API VARIABLES AND HELPERS
const baseURL = "http://localhost/api/v1"
const patentsURL = baseURL + "/patents"
const patentURL = id => patentsURL + "/" + id
const jsonHeader = { "Content-Type": "application/vnd.api+json" }
const formatSideloadUrl = url => {
  const splitUrl = url.split("/")
  splitUrl.shift()
  return process.env.NODE_ENV === "production"
    ? "http://sethipc.com/" + splitUrl.join("/")
    : "http://localhost/" + splitUrl.join("/")
}

export const loadPatent = (number: number) => ({
  [RSAA]: {
    endpoint: patentURL(number),
    method: "GET",
    headers: jsonHeader,
    types: [
      { type: LOAD_REQUEST, payload: req => req },
      LOAD_SUCCESS,
      LOAD_FAILURE,
    ],
  },
})

export const loadPatentAndColumns = (number: number) => {
  const sideload = (link: string) => ({
    [RSAA]: {
      endpoint: link,
      method: "GET",
      types: [
        { type: SIDELOAD_REQUEST, payload: req => req },
        SIDELOAD_SUCCESS,
        SIDELOAD_FAILURE,
      ],
    },
  })
  return dispatch => {
    dispatch(loadPatent(number))
      .then(res => {
        console.log(res)
        const { columns } = res.payload.data.relationships
        dispatch(sideload(formatSideloadUrl(columns.links.related)))
      })
      .catch(res => {
        toast.error(res.data)
      })
  }
}

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
      { type: LOAD_ALL_REQUEST, payload: req => req },
      LOAD_ALL_SUCCESS,
      LOAD_ALL_FAILURE,
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
  LOAD_ALL_REQUEST,
  LOAD_ALL_SUCCESS,
  LOAD_ALL_FAILURE,
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
}
