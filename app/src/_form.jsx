/** @format */
// @flow

import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { withFormik, ErrorMessage } from "formik"
import { Box, Heading, Select, Anchor } from "grommet"
import * as Yup from "yup"
import { Search, Send } from "grommet-icons"
import {
  createPatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
} from "./_redux/patentActions"
import { toast } from "react-toastify"

type FormikBag = {
  values: {},
  touched: {},
  dirty: {},
  errors: {},
  handleChange: () => void,
  handleBlur: () => void,
  handleSubmit: () => void,
  handleReset: () => void,
  setFieldValue: (string, mixed) => void,
  setFieldTouched: (string, mixed) => void,
  isSubmitting: boolean,
}

const numberSchema = Yup.object().shape({
  patentNumber: Yup.string()
    .length(7, "Number must be 7 digits (for now)")
    .required("A Valid Patent Number is Required"),
})

const BaseForm = ({
  createPatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
  patentNumbers,
  ...props
}: {
  patentNumbers: Array<{}>,
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  loadPatentAndColumns: number => void,
  props: FormikBag,
}) => {
  const {
    values,
    touched,
    handleSubmit,
    handleReset,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = props
  const options = () => {
    if (patentNumbers.length == 0) {
      return { label: "Create New", value: inputValue }
    } else {
      return patentNumbers.map(p => ({
        label: p.attributes.number,
        value: p.attributes.number,
      }))
    }
  }

  React.useEffect(() => {
    fetchPatentNumbers("")
  }, [fetchPatentNumbers])

  const [inputValue, setInputValue] = React.useState("")

  const handleSearch = val => {
    setInputValue(val)
    setFieldValue("patentNumber", val)
    fetchPatentNumbers(val)
  }

  console.log(options)
  return (
    <>
      <Select
        plain
        focusIndicator={true}
        icon={<Search />}
        size="large"
        name="patentNumber"
        searchPlaceholder="e.g., 7629705"
        onSearch={val => handleSearch(val)}
        labelKey="label"
        valueKey="value"
        options={options()}
        value={values.patentNumber}
        onChange={val => {
          setFieldValue("patentNumber", val)
        }}
      />
      <ErrorMessage name="patentNumber" component="div" />
    </>
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

const PatentForm = withFormik({
  displayName: "Patent Form",
  enableReinitialize: true,
  mapPropsToValues: props => ({
    patentNumber: props.patentNumbers[0]
      ? props.patentNumbers[0].attributes.number
      : "",
  }),
  validateOnSchema: numberSchema,
  handleSubmit: (values, { setSubmitting }) => {
    createPatent(values.patentNumber)
    setSubmitting(false)
  },
})(BaseForm)

export default connect(
  mapState,
  mapDispatch,
)(PatentForm)
