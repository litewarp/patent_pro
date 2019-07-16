/** @format */
// @flow

import * as React from "react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router-dom"
import AsyncCreatableSelect from "react-select/async-creatable"
import { AddCircle } from "grommet-icons"
import { toCommas } from "../_root/_helpers"
import { actions as patentActions } from "../_redux/patentActions"
import { customStyles, DropdownIndicator, AddPatentAnchor } from "./_styles"

const PatentForm = ({
  history,
  isDisplaySmall,
}: {
  history: {},
  isDisplaySmall: boolean,
}) => {
  //localstate
  const [inputValue, setInputValue] = React.useState("")
  //redux
  const dispatch = useDispatch()
  const patents = useSelector(({ patent }) => patent.patents)
  const patentNumbers = useSelector(
    ({ patent }) => patent.patentNumbers,
    shallowEqual,
  )
  const { searchPatents, createPatent, loadPatents } = patentActions

  React.useEffect(() => {
    const initialLoad = () => dispatch(loadPatents())
    initialLoad()
  }, [])

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

  const handleCreate = (newOption: number) => {
    dispatch(createPatent(newOption))
      .then(res => {
        const { number } = res.payload.data.attributes
        history.push(`/patents/${number}/`)
      })
      .catch(err => console.log(err))
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
      styles={customStyles(isDisplaySmall)}
      loadOptions={(inputValue, callback) => fetchOptions(inputValue, callback)}
      onChange={option => {
        history.push(`/patents/${option.value}`)
      }}
      onInputChange={option => handleInputChange(option)}
      onCreateOption={val => handleCreate(val)}
    />
  )
}

export default withRouter(PatentForm)
