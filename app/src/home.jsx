/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Form, FormField, TextInput, Text, Grid } from "grommet"
import { createPatent, fetchPatentNumbers } from "./_redux/patentActions"
import PatentForm from "./_form"
import PatentList from "./_list"
import ActivePatent from "./patent"

const Home = ({
  match,
  size,
  fetchPatentNumbers,
  createPatent,
  patentNumbers,
}: {
  match: {},
  size: string,
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  patentNumbers: Array<Object>,
}) => (
  <Grid
    fill
    rows={["xxsmall", "xxsmall", "flex"]}
    columns={[["small", "medium"], "flex"]}
    areas={[
      { name: "side", start: [0, 0], end: [0, 2] },
      { name: "head", start: [1, 0], end: [1, 0] },
      { name: "main", start: [1, 1], end: [1, 2] },
    ]}
  >
    <Box gridArea="side" background="light-6" align="center">
      <PatentForm
        createPatent={createPatent}
        fetchPatentNumbers={fetchPatentNumbers}
        options={patentNumbers.map((pN, index) => pN.attributes.number)}
      />
      <PatentList />
    </Box>
    <ActivePatent />
  </Grid>
)

const mapState = ({ patent }) => ({
  patentNumbers: patent.patentNumbers,
})

const mapDispatch = dispatch => ({
  createPatent: bindActionCreators(createPatent, dispatch),
  fetchPatentNumbers: bindActionCreators(fetchPatentNumbers, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(Home)
