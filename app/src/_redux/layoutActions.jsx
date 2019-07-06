/** @format */

import { RSAA } from "redux-api-middleware"
import { toast } from "react-toastify"

const CREATE_TOAST = "@layout/CREATE_TOAST"
const DELETE_TOAST = "@layout/DELETE_TOAST"

export const newToast = (msg: string) => {
  const makeToast = ({ msg, id }) => ({
    type: CREATE_TOAST,
    payload: { msg: msg, id: id },
  })
  return dispatch => {
    const id = toast.success(msg)
    dispatch(makeToast({ msg, id }))
  }
}

export const deleteToast = id => {
  const noToast = id => ({
    type: DELETE_TOAST,
    payload: id,
  })
  return dispatch => {
    dispatch(noToast(id))
    toast.dismiss(id)
  }
}

export const actionRefs = {
  CREATE_TOAST,
  DELETE_TOAST,
}
