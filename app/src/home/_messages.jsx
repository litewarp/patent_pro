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
  errors,
  touched,
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
      onBlur={ev => setFieldTouched(name, true)}
      onChange={ev => setFieldValue(name, ev.target.value)}
      error={errors[`${name}`] && touched[`${name}`] ? errors[`${name}`] : null}
    />
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
    <Box pad="medium">
      <Form onSubmit={handleSubmit}>
        <FormikField name="name" label="Full Name" {...props} />
        <FormikField name="email" label="Email Address" {...props} />
        <FormikField
          name="message"
          label="Your Message"
          component={TextArea}
          {...props}
        />
        <SubmitButton type="submit" primary icon={<Send />} label="Submit" />
      </Form>
    </Box>
  </Layer>
)

const MessageModal = withFormik({
  mapPropsToValues: () => ({
    name: "",
    email: "",
    message: "",
  }),

  validationSchema: Yup.object().shape({
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

export default MessageModal
