/** @format */

import * as React from "react"
import { Anchor } from "grommet"
import styled from "styled-components"
import { components } from "react-select"
import { Search } from "grommet-icons"

export const customStyles = {
  clearIndicator: (provided, state) => ({}),
  container: (provided, state) => ({
    ...provided,
    width: "100%",
  }),
  control: (provided, state) => ({
    ...provided,
    display: "flex",
    flexStart: "end",
    flexBasis: "fill",
    backgroundColor: "transparent",
    border: state.isFocused ? "1px solid" : "1px solid rgba(255,255,255,0.4)",
    borderRadius: "4px",
    borderColor: state.isFocused ? "#FFF8F0" : "none",
    boxShadow: state.isFocused ? "0 0 2px 2px #FFF8F0" : "none",
  }),
  dropdownIndicator: (provided, state) => ({ ...provided }),
  indicatorsContainer: (provided, state) => ({ ...provided }),
  indicatorSeparator: (provided, state) => ({}),
  input: (provided, state) => ({
    ...provided,
    color: "white",
  }),
  loadingIndicator: (provided, state) => ({ ...provided }),
  loadingMessage: (provided, state) => ({ ...provided }),
  menu: (provided, state) => ({ ...provided, backgroundColor: "#353535" }),
  menuList: (provided, state) => ({ ...provided }),
  menuPortal: (provided, state) => ({ ...provided }),
  noOptionsMessage: (provided, state) => ({ ...provided }),
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
  singleValue: (provided, state) => ({ ...provided, fontSize: "1em" }),
  valueContainer: (provided, state) => ({
    ...provided,
  }),
}

export const DropdownIndicator = props => (
  <components.DropdownIndicator {...props}>
    <Search />
  </components.DropdownIndicator>
)

export const AddPatentAnchor = styled(Anchor)`
  font-size: 1.25em;
  font-variant: all-small-caps;
`
