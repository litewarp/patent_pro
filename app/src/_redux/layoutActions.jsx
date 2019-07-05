/** @format */

import { RSAA } from "redux-api-middleware"
import { toast } from "react-toastify"

const CREATE_TOAST = "@layout/CREATE_TOAST"
const DELETE_TOAST = "@layout/DELETE_TOAST"

export const newToast = msg => {
  const makeToasty = text => ({
    type: CREATE_TOAST,
    payload: text,
  })
  return dispatch => {
    dispatch(makeToasty(msg))
    toast.success(msg)
  }
}

export const deleteToast = msg => {
  const makeToasty = text => ({
    type: CREATE_TOAST,
    payload: text,
  })
  return dispatch => {
    dispatch(makeToasty(msg))
    toast.success(msg)
  }
}

export const actionRefs = {
  CREATE_TOAST,
  DELETE_TOAST,
}
