/** @format */
// @flow

import React from "react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import AsyncCreatableSelect from "react-select/async-creatable"
import { AddCircle } from "grommet-icons"
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
  const activePatent = useSelector(
    ({ patent }) => patent.activePatent,
    shallowEqual,
  )
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
    dispatch(searchPatents(inputValue || ""))
    callback(formatOptions())
  }

  const handleInputChange = (val: string) => {
    setInputValue(val)
    dispatch(searchPatents(val))
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
      onChange={option => {}}
      onInputChange={option => handleInputChange(option)}
      onCreateOption={val => dispatch(createPatent(val))}
      value={value}
    />
  )
}

export default PatentForm
