/** @format */
// @flow

import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Select, Anchor } from "grommet"
import * as Yup from "yup"
import AsyncCreatableSelect from "react-select/async-creatable"
import { AddCircle, Search, Send } from "grommet-icons"
import { toast } from "react-toastify"
import { toCommas } from "./_root/_helpers"
import {
  createPatent,
  setActivePatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
} from "./_redux/patentActions"
import { customStyles, DropdownIndicator, AddPatentAnchor } from "./_styles"

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
      label: toCommas(p.attributes.number),
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
      components={{ DropdownIndicator }}
      placeholder={"Enter Patent Number"}
      defaultOptions
      isValidNewOption={option => /^[0-9RE]{5,10}$/.test(option)}
      formatCreateLabel={() => (
        <AddPatentAnchor label="Add a Patent" icon={<AddCircle />} />
      )}
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
