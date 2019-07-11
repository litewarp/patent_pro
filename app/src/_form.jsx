/** @format */
// @flow

import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Formik, ErrorMessage } from "formik"
import { Box, Heading, Select } from "grommet"
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

const PatentForm = ({
  createPatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
  patentNumbers,
}: {
  patentNumbers: Array<{}>,
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  loadPatentAndColumns: number => void,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const options = patentNumbers.map(pN => pN.attributes.number)

  const loadOptions = (inputValue, callback) => {
    fetchPatentNumbers(inputValue)
    callback(options)
  }
  return (
    <Formik
      initialValues={{ patentNumber: "" }}
      onSubmit={(values, { resetForm }) => {
        createPatent(values.patentNumber)
      }}
      validationSchema={numberSchema}
      render={({
        values,
        touched,
        dirty,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
      }: FormikBag) => (
        <>
          <Select
            name="patentNumber"
            placeholder="e.g., 7629705"
            onSearch={val => fetchPatentNumbers(val)}
            options={options}
            open={isOpen}
            value={values.patentNumber}
            onChange={val => {
              setFieldValue("patentNumber", val)
              loadPatentAndColumns(val)
            }}
          />
          <ErrorMessage name="patentNumber" component="div" />
        </>
      )}
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
