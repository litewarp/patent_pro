/** @format */

// @flow

import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box } from "grommet"
import AddPatentButton from "./addButton"
import {
  createPatent,
  fetchPatentNumbers,
  loadPatentAndColumns,
} from "../../_redux/patentActions"
import { toCommas } from "../_helpers"
import { Brand, NavLinks, PatentNav } from "./navs"

const Header = ({
  size,
  activePatent,
  createPatent,
  fetchPatentNumbers,
  patentNumbers,
  loadPatentAndColumns,
}: {
  size: string,
  activePatent: {
    attributes: {
      number: string,
    },
  },
  createPatent: number => void,
  fetchPatentNumbers: (?string) => void,
  patentNumbers: Array<Object>,
  loadPatentAndColumns: number => void,
}) => {
  //helpers
  const DISPLAY_SMALL = size === "small"
  const DISPLAY_LARGE = size === "large"

  const activePatentNumber =
    activePatent &&
    activePatent.attributes &&
    toCommas(activePatent.attributes.number)

  const patentPath = () => `/patents/${activePatent.attributes.number}`

  return (
    <Box
      direction="row"
      pad={{ horizontal: "medium" }}
      background="brand"
      justify="end"
      gap="medium"
    >
      <Brand DISPLAY_SMALL={DISPLAY_SMALL} />
      <AddPatentButton
        options={patentNumbers}
        loadPatentAndColumns={loadPatentAndColumns}
        fetchPatentNumbers={fetchPatentNumbers}
        createPatent={createPatent}
      />
      {!activePatentNumber ? (
        <NavLinks />
      ) : (
        <PatentNav label={`U.S. ${activePatentNumber}`} path={patentPath()} />
      )}
    </Box>
  )
}

const mapState = ({ patent }) => ({
  activePatent: patent.activePatent,
  patentNumbers: patent.patentNumbers,
})

const mapDispatch = dispatch => ({
  loadPatentAndColumns: bindActionCreators(createPatent, dispatch),
  createPatent: bindActionCreators(createPatent, dispatch),
  fetchPatentNumbers: bindActionCreators(fetchPatentNumbers, dispatch),
})

export default connect(
  mapState,
  mapDispatch,
)(Header)
