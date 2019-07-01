/** @format */

import React from "react"
import { combineReducers } from "redux"

import { layoutReducer } from "./layouts"
import { columnReducer } from "./columnReducer"

const rootReducer = combineReducers({
  layout: layoutReducer,
  column: columnReducer,
})

export default rootReducer
