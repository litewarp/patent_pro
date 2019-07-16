/** @format */

import { combineReducers } from "redux"

import { columnReducer } from "../_redux/columnReducer"
import { patentReducer } from "../_redux/patentReducer"
import { layoutReducer } from "../_redux/layoutReducer"

const rootReducer = combineReducers({
  layout: layoutReducer,
  column: columnReducer,
  patent: patentReducer,
})

export default rootReducer
