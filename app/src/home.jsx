/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, Form, FormField, TextInput, Text, Grid } from "grommet"
import PatentForm from "./_form"
import PatentList from "./_list"
import ActivePatent from "./patent"

const Home = ({ match, size }: { match: {}, size: string }) => <ActivePatent />

export default Home
