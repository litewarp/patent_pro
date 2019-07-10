/** @format */

// @flow
import * as React from "react"
import { Box, Heading, Button, DropButton } from "grommet"
import { Add, Close } from "grommet-icons"
import PatentForm from "../../_form"

const AddPatentButton = props => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <DropButton
      a11yTitle="Add a Patent to Parse"
      dropAlign={{ top: "bottom", right: "right" }}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
      dropContent={
        <Box pad="small">
          <Button
            alignSelf="end"
            icon={<Close />}
            onClick={() => setIsOpen(false)}
          />
          <PatentForm {...props} />
        </Box>
      }
    >
      <Add size="medium" />
    </DropButton>
  )
}
export default AddPatentButton
