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
  patentNumber: Yup.number()
    .lessThan(8, "Number must be 7 digits (for now)")
    .moreThan(6, "Number must be 7 digits (for now)")
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
    onSubmit={(values, { setSubmitting }) => {
      createPatent(values.patentNumber)
      setSubmitting(false)
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
        <Form>
          <Box align="center" fill={{ horizontal: true }} gap="small">
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
              onKeyPress={ev => (ev.key === "Enter" ? handleSubmit() : null)}
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
