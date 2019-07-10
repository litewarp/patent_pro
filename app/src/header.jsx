/** @format */

// @flow
import * as React from "react"
import { Box, Heading, DropButton } from "grommet"
import { Add } from "grommet-icons"
import PatentForm from "./_form"

const AddPatentButton = ({ options, createPatent, fetchPatentNumbers }) => (
  <DropButton
    label={<Add />}
    dropAlign={{ top: "bottom", right: "right" }}
    dropContent={
      <PatentForm
        options={options}
        createPatent={createPatent}
        fetchPatentNumbers={fetchPatentNumbers}
      />
    }
  />
)
export default AddPatentButton
