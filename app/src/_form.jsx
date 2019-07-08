/** @format */
// @flow

import React from "react"
import { Formik, ErrorMessage } from "formik"
import { Box, Form, FormField, Heading, TextInput, Button } from "grommet"
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
}: {
  options: Array<{}>,
  createPatent: number => void,
  fetchPatentNumbers: string => void,
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
            <TextInput
              type="search"
              placeholder="e.g., 7629705"
              onChange={ev => {
                fetchPatentNumbers(ev.target.value)
                setFieldValue("patentNumber", ev.target.value)
              }}
              onSelect={ev => {
                setFieldValue("patentNumber", ev.currentTarget.innerText)
              }}
              onBlur={() => setFieldTouched("patentNumber", true)}
              value={values.patentNumber}
              name="patentNumber"
              suggestions={options}
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