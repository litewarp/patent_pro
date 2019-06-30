import React from 'react'
import { combineReducers } from "redux"

import { layoutReducer } from "./layouts"
import { pdfReducer } from "./pdf"

const rootReducer = combineReducers({
  layout: layoutReducer,
  pdf: pdfReducer
})

export default rootReducer
