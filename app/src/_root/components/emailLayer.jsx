/** @format */

import * as React from "react"
import { Layer, Form, Box, Button, FormField, TextArea } from "grommet"
import { Send } from "grommet-icons"
import * as Yup from "yup"
import { withFormik, ErrorMessage } from "formik"
import styled from "styled-components"

const SubmitButton = styled(Button)`
  max-width: 50%;
`
const FormikField = ({
  name,
  label,
  setFieldValue,
  setFieldTouched,
  ...props
}) => (
  <>
    <FormField
      {...props}
      name={name}
      label={label}
      onFocus={ev => setFieldTouched(name, true)}
      onChange={ev => setFieldValue(name, ev.target.value)}
    >
      {props.children}
    </FormField>
    <ErrorMessage name={name} />
  </>
)

const EmailLayer = ({ showModal, handleSubmit, ...props }) => (
  <Layer
    full
    margin="xlarge"
    position="center"
    modal
    onClickOutside={() => showModal(false)}
  >
    <Form onSubmit={handleSubmit}>
      <Box pad="medium">
        <FormikField name="name" label="Full Name" {...props} />
        <FormikField name="email" label="Email Address" {...props} />
        <FormikField
          name="message"
          label="Your Message"
          htmlFor="text-area"
          {...props}
        >
          <TextArea id="text-area" placeholder="some text!" />{" "}
        </FormikField>
        <SubmitButton type="submit" primary icon={<Send />} label="Submit" />
      </Box>
    </Form>
  </Layer>
)

const EmailModal = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    message: "",
  }),

  validationSchema: () =>
    Yup.object.shape({
      name: Yup.string().required("Name Required"),
      email: Yup.string()
        .email("Invalid Email")
        .required("Valid Email Required"),
      message: Yup.string().required("Message Required"),
    }),

  handleSubmit: (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 1000)
  },

  displayName: "MessageForm",
})(EmailLayer)

export default EmailModal
