/** @format */
// @flow

import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Select, Anchor } from "grommet"
import * as Yup from "yup"
import AsyncCreatableSelect from "react-select/async-creatable"
import { Search, Send } from "grommet-icons"
import { toast } from "react-toastify"
import {
  createPatent,
  setActivePatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
} from "./_redux/patentActions"

const customStyles = {
  clearIndicator: (provided, state) => ({}),
  container: (provided, state) => ({ ...provided }),
  control: (provided, state) => ({}),
  dropdownIndicator: (provided, state) => ({}),
  group: (provided, state) => ({}),
  groupHeading: (provided, state) => ({}),
  indicatorsContainer: (provided, state) => ({ ...provided }),
  indicatorSeparator: (provided, state) => ({}),
  input: (provided, state) => ({}),
  loadingIndicator: (provided, state) => ({}),
  loadingMessage: (provided, state) => ({}),
  menu: (provided, state) => ({}),
  menuList: (provided, state) => ({}),
  menuPortal: (provided, state) => ({}),
  noOptionsMessage: (provided, state) => ({}),
  option: (provided, state) => ({}),
  placeholder: (provided, state) => ({}),
  singleValue: (provided, state) => ({}),
  valueContainer: (provided, state) => ({}),
}
const PatentForm = ({
  createPatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
  patentNumbers,
}: {
  patentNumbers: Array<{
    attributes: {
      number: string,
    },
  }>,
  createPatent: string => void,
  fetchPatentNumbers: (?string) => void,
  loadPatentAndColumns: number => void,
}) => {
  const formatOptions = () =>
    patentNumbers.map(p => ({
      label: p.attributes.number,
      value: p.attributes.number,
    }))

  const [value, setValue] = React.useState("")
  const [inputValue, setInputValue] = React.useState("")

  const fetchOptions = (inputValue, callback) => {
    fetchPatentNumbers(inputValue || "")
    callback(formatOptions())
  }

  const handleInputChange = (val: string) => {
    setInputValue(val)
    fetchPatentNumbers(val)
  }

  return (
    <AsyncCreatableSelect
      name="patentNumber"
      placeholder="e.g., 7629705"
      defaultOptions
      styles={customStyles}
      loadOptions={(inputValue, callback) => fetchOptions(inputValue, callback)}
      onChange={option => {
        setValue(option)
        loadPatentAndColumns(option)
      }}
      onInputChange={option => handleInputChange(option)}
      onCreateOption={val => createPatent(val)}
      value={value}
    />
  )
}

const mapState = ({ patent }) => ({
  activePatent: patent.activePatent,
  patentNumbers: patent.patentNumbers,
})

const mapDispatch = dispatch => ({
  loadPatentAndColumns: bindActionCreators(loadPatentAndColumns, dispatch),
  createPatent: bindActionCreators(createPatent, dispatch),
  fetchPatentNumbers: bindActionCreators(fetchPatentNumbers, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(PatentForm)
