/** @format */

import React from "react"
import { combineReducers } from "redux"

import { columnReducer } from "../_redux/columnReducer"
import { patentReducer } from "../_redux/patentReducer"
const rootReducer = combineReducers({
  column: columnReducer,
  patent: patentReducer,
})

export default rootReducer
