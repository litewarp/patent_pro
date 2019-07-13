/** @format */

import { getJSON, RSAA } from "redux-api-middleware"
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
const SEARCH_NUMBERS_REQUEST = "@patent/SEARCH_NUMBERS_REQUEST"
const SEARCH_NUMBERS_SUCCESS = "@patent/SEARCH_NUMBERS_SUCCESS"
const SEARCH_NUMBERS_FAILURE = "@patent/SEARCH_NUMBERS_FAILURE"
const SIDELOAD_REQUEST = "@patent/SIDELOAD_REQUEST"
const SIDELOAD_SUCCESS = "@patent/SIDELOAD_SUCCESS"
const SIDELOAD_FAILURE = "@patent/SIDELOAD_REQUEST"
const DELETE_REQUEST = "@patent/DELETE_REQUEST"
const DELETE_SUCCESS = "@patent/DELETE_SUCCESS"
const DELETE_FAILURE = "@patent/DELETE_FAILURE"
const MODEL_PATENT_REQUEST = "@patent/MODEL_PATENT_REQUEST"
const MODEL_PATENT_SUCCESS = "@patent/MODEL_PATENT_SUCCESS"
const MODEL_PATENT_FAILURE = "@patent/MODEL_PATENT_FAILURE"
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

const loadPatent = (number: number) => ({
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

const deletePatent = (patentId: number) => ({
  [RSAA]: {
    endpoint: "http://localhost/api/v1/patents/" + patentId,
    method: "DELETE",
    headers: jsonHeader,
    types: [
      {
        type: DELETE_REQUEST,
        payload: (action, state) => {
          toast.info("Deleting Patent")
          return action
        },
      },
      {
        type: DELETE_SUCCESS,
        payload: (action, state, res) => {
          toast.success("Patent Deleted")
          return getJSON(res)
        },
      },
      {
        type: DELETE_FAILURE,
        payload: (action, state, res) => {
          toast.error("Cannot Delete Patent")
          return getJSON(res)
        },
      },
    ],
  },
})
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
const loadColumns = (number: number) => {
  return dispatch => {
    dispatch(loadPatent(number))
      .then(res => {
        const { columns } = res.payload.data.relationships
        dispatch(sideload(formatSideloadUrl(columns.links.related)))
      })
      .catch(res => {
        toast.error(res.data)
      })
  }
}

const loadPatents = () => ({
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

const createPatent = (number: number) => {
  const payload = JSON.stringify({
    data: {
      type: "patents",
      attributes: {
        number: number,
      },
    },
  })
  return {
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
            return res.json()
          },
        },
        {
          type: CREATE_FAILURE,
          payload: (action, state, res) => {
            toast.error("Creation Failed")
            return res.json()
          },
        },
      ],
      body: payload,
    },
  }
}

const searchPatents = (searchQuery: string) => ({
  [RSAA]: {
    endpoint: patentsURL,
    method: "GET",
    headers: jsonHeader,
    types: [
      { type: SEARCH_NUMBERS_REQUEST, payload: req => req },
      SEARCH_NUMBERS_SUCCESS,
      SEARCH_NUMBERS_FAILURE,
    ],
    params: searchQuery
      ? { filter: { number: searchQuery.replace(",", "") } }
      : {},
  },
})

const loadModelPatent = (number: number) => {
  const load = () => ({
    [RSAA]: {
      endpoint: patentURL(number),
      method: "GET",
      headers: jsonHeader,
      types: [MODEL_PATENT_REQUEST, MODEL_PATENT_SUCCESS, MODEL_PATENT_FAILURE],
    },
  })
  return dispatch =>
    dispatch(load(number))
      .then(res => {
        const { columns } = res.payload.data.relationships
        dispatch(sideload(formatSideloadUrl(columns.links.related)))
      })
      .catch(res => {
        toast.error(res.data)
      })
}

export const actions = {
  loadPatent,
  loadColumns,
  loadModelPatent,
  loadPatents,
  createPatent,
  searchPatents,
  deletePatent,
}

export const actionRefs = {
  SEARCH_NUMBERS_REQUEST,
  SEARCH_NUMBERS_SUCCESS,
  SEARCH_NUMBERS_FAILURE,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  LOAD_ALL_REQUEST,
  LOAD_ALL_SUCCESS,
  LOAD_ALL_FAILURE,
  MODEL_PATENT_REQUEST,
  MODEL_PATENT_SUCCESS,
  MODEL_PATENT_FAILURE,
  SIDELOAD_REQUEST,
  SIDELOAD_SUCCESS,
  SIDELOAD_FAILURE,
  CREATE_REQUEST,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
}
