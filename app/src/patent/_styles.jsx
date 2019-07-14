/** @format */
// @flow
import * as React from "react"
import { Box } from "grommet"
import Select from "react-select"
import styled from "styled-components"
import {
  Rewind,
  FastForward,
  DocumentImage,
  DocumentText,
  OrderedList,
  Grid,
  TextAlignFull,
} from "grommet-icons"

export const columnSelectIcon = ({
  name,
  isVisible,
}: {
  name: string,
  isVisible: boolean,
}) => {
  const svgProps = { color: isVisible ? "status-warning" : "dark-6" }
  switch (name) {
    case "rawImg":
      return <DocumentImage {...svgProps} />
    case "linedImg":
      return <OrderedList {...svgProps} />
    case "lineText":
      return <TextAlignFull {...svgProps} />
    case "columnText":
      return <Grid {...svgProps} />
  }
}

export const FixedBox = styled(Box)`
  max-width: 1280px;
`
export const ColumnSelect = styled(Select)`
  text-align: center;
  font-size: 2em;
  font-variant: small-caps;
  padding: 0;
`

export const columnNumberSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    flexBasis: "fill",
    backgroundColor: "transparent",
    border: state.isFocused ? "1px solid" : "1px solid rgba(255,255,255,0.4)",
    borderRadius: "4px",
    borderColor: state.isFocused ? "#FFF8F0" : "none",
    boxShadow: state.isFocused ? "0 0 2px 2px #FFF8F0" : "none",
  }),
  input: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided, state) => ({ ...provided, backgroundColor: "#353535" }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "black" : "white",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "white",
    opacity: "0.6",
    fontSize: "1.25rem",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "white",
    fontSize: "1.25em",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
  }),
}
