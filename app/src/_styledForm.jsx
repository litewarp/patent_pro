/** @format */

import * as React from "react"
import styled from "styled-components"
import AsyncCreatableSelect from "react-select/async-creatable"

const StyledPatentSelect = styled(AsyncCreatableSelect)`
  &.patent__control {
    color: #c01722;
  }

  &.patent__value-container {
    .patent__placeholder {
      font-family: gibbs;
      font-size: 2em;
    }
  }
`

export default StyledPatentSelect
