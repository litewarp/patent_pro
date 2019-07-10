/** @format */
// @flow

import React from "react"
import { Formik, ErrorMessage } from "formik"
import { Box, Form, FormField, Heading, TextInput, Button } from "grommet"
import AsyncCreatableSelect from "react-select/async-creatable"
import * as Yup from "yup"
import { Search, Send } from "grommet-icons"

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
  // redux
  options,
  createPatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
  patentNumbers,
}: {
  patentNumbers: Array<{}>,
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  loadPatentAndColumns: number => void,
}) => (
  <Formik
    validateOnChange={false}
    initialValues={{ patentNumber: "" }}
    onSubmit={(values, { resetForm }) => {
      createPatent(values.patentNumber)
      resetForm()
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
    }: FormikBag) => {
      return (
        <Form onSubmit={handleSubmit}>
          <Box
            align="center"
            gap="small"
            pad={{ left: "small", right: "small" }}
          >
            <Heading level={4}>Enter a US Patent Number</Heading>
            <AsyncCreatableSelect
              isClearable
              onInputChange={val => {
                fetchPatentNumbers(val)
                setFieldValue("patentNumber", val)
              }}
              placeholder="e.g., 7629705"
              loadOptions={() => fetchPatentNumbers()}
              onCreateOption={val => {
                setFieldValue("patentNumber", val)
                handleSubmit()
              }}
              onBlur={() => setFieldTouched("patentNumber", true)}
              onChange={val => loadPatentAndColumns(val)}
              inputValue={values.patentNumber}
              name="patentNumber"
              options={patentNumbers.map(p => ({
                label: p.attributes.number,
                value: p.attributes.number,
              }))}
            />
            <ErrorMessage name="patentNumber" component="div" />
            <Button icon={<Send />} type="submit" gap="medium" label="Submit" />
          </Box>
        </Form>
      )
    }}
  />
)
export default PatentForm
