/** @format */
// @flow

import * as React from "react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import { Box, Heading, Select, Anchor } from "grommet"
import * as Yup from "yup"
import AsyncCreatableSelect from "react-select/async-creatable"
import { AddCircle, Search, Send } from "grommet-icons"
import { toast } from "react-toastify"
import { toCommas } from "../_root/_helpers"
import { actions as patentActions } from "../_redux/patentActions"
import { customStyles, DropdownIndicator, AddPatentAnchor } from "./_styles"

const PatentForm = ({ history }: { history: {} }) => {
  //localstate
  const [inputValue, setInputValue] = React.useState("")
  //redux
  const dispatch = useDispatch()
  const loading = useSelector(({ patent }) => patent.loading)
  const patents = useSelector(({ patent }) => patent.patents)
  const patentNumbers = useSelector(
    ({ patent }) => patent.patentNumbers,
    shallowEqual,
  )
  const activePatent = useSelector(({ patent }) => patent.activePatent)
  const {
    searchPatents,
    loadColumns,
    createPatent,
    loadPatents,
  } = patentActions

  React.useEffect(() => {
    const initialLoad = () => dispatch(loadPatents())
    initialLoad()
  }, [])

  //component actions
  const value = activePatent &&
    activePatent.attributes && {
      label: activePatent.attributes.number,
      value: activePatent.attributes.number,
    }

  const formatOptions = (
    array: Array<{ id: number, attributes: { number: string } }>,
  ) =>
    array.map(p => ({
      label: toCommas(p.attributes.number),
      value: p.attributes.number,
    }))

  const fetchOptions = (inputValue, callback) => {
    dispatch(searchPatents(inputValue || ""))
    callback(formatOptions(patentNumbers))
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
      defaultOptions={formatOptions(patents)}
      isValidNewOption={option => /^[0-9RE]{6,10}$/.test(option)}
      formatCreateLabel={() => (
        <AddPatentAnchor label="Add a Patent" icon={<AddCircle />} />
      )}
      styles={customStyles}
      loadOptions={(inputValue, callback) => fetchOptions(inputValue, callback)}
      onChange={option => {
        history.push(`/patents/${option.value}`)
      }}
      onInputChange={option => handleInputChange(option)}
      onCreateOption={val => dispatch(createPatent(val))}
    />
  )
}

export default withRouter(PatentForm)
