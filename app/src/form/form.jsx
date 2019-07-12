/** @format */
// @flow

import React from "react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { Box, Heading, Select, Anchor } from "grommet"
import * as Yup from "yup"
import AsyncCreatableSelect from "react-select/async-creatable"
import { AddCircle, Search, Send } from "grommet-icons"
import { toast } from "react-toastify"
import { toCommas } from "../_root/_helpers"
import { actions as patentActions } from "../_redux/patentActions"
import { customStyles, DropdownIndicator, AddPatentAnchor } from "./_styles"

const PatentForm = () => {
  //localstate
  const [inputValue, setInputValue] = React.useState("")
  //redux
  const dispatch = useDispatch()
  const patentNumbers = useSelector(
    ({ patent }) => patent.patentNumbers,
    shallowEqual,
  )
  const activePatent = useSelector(({ patent }) => patent.activePatent)
  const { searchPatents, loadColumns, createPatent } = patentActions
  //component actions
  const value = activePatent &&
    activePatent.attributes && {
      label: activePatent.attributes.number,
      value: activePatent.attributes.number,
    }

  const formatOptions = () =>
    patentNumbers.map(p => ({
      label: toCommas(p.attributes.number),
      value: p.attributes.number,
    }))

  const fetchOptions = (inputValue, callback) => {
    searchPatents(inputValue || "")
    callback(formatOptions())
  }

  const handleInputChange = (val: string) => {
    setInputValue(val)
    searchPatents(val)
  }

  return (
    <AsyncCreatableSelect
      name="patentNumber"
      components={{ DropdownIndicator }}
      placeholder={"Enter a US Patent to Start"}
      defaultOptions
      isValidNewOption={option => /^[0-9RE]{6,10}$/.test(option)}
      formatCreateLabel={() => (
        <AddPatentAnchor label="Add a Patent" icon={<AddCircle />} />
      )}
      styles={customStyles}
      loadOptions={(inputValue, callback) => fetchOptions(inputValue, callback)}
      onChange={option => {
        loadColumns(option)
      }}
      onInputChange={option => handleInputChange(option)}
      onCreateOption={val => createPatent(val)}
      value={value}
    />
  )
}

export default PatentForm
