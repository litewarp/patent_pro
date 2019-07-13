/** @format */

import React from "react"
import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import { columnReducer } from "../_redux/columnReducer"
import { patentReducer } from "../_redux/patentReducer"
import { layoutReducer } from "../_redux/layoutReducer"

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    layout: layoutReducer,
    column: columnReducer,
    patent: patentReducer,
  })

export default createRootReducer
