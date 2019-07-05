/** @format */

// @flow
import * as React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Box, Heading, FormField, TextInput } from "grommet"
import { Search } from "grommet-icons"
import { createPatent, fetchPatentNumbers } from "./_redux/patentActions"

const Home = ({
  fetchPatentNumbers,
  createPatent,
  patentNumbers,
}: {
  createPatent: string => void,
  fetchPatentNumbers: (?string) => void,
  patentNumbers: Array<Object>,
}) => {
  const [value, setValue] = React.useState("")
  const suggestions = patentNumbers.map((pN, index) => pN.attributes.number)

  const handleChange = val => {
    setValue(val)
    fetchPatentNumbers(val)
  }

  const handleSelect = val => {
    setValue(val)
  }

  const handleKeyPress = val => {
    if (val === "Enter") {
      createPatent(value)
    }
  }

  return (
    <Box>
      <Heading level={2}> PTO Patent PDF Parser Pro (Pre-Release) </Heading>
      <Heading level={4}>Enter a US Patent Number</Heading>

      <Box direction="row" align="center" gap="small">
        <Search color="brand" />
        <TextInput
          name="patent"
          type="search"
          placeholder="e.g., 7629705"
          value={value}
          dropProps={{ height: "small" }}
          onKeyPress={e => handleKeyPress(e.key)}
          onChange={e => handleChange(e.target.value)}
          onSelect={e => handleSelect(e.target.value)}
          suggestions={suggestions}
        />
      </Box>
    </Box>
  )
}

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
