/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Form, FormField, TextInput, Text, Grid } from "grommet"
import PatentForm from "./_form"
import PatentList from "./_list"
import ActivePatent from "./patent"

const Home = ({ match, size }: { match: {}, size: string }) => (
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
      <PatentList />
    </Box>
    <ActivePatent />
  </Grid>
)

export default Home
