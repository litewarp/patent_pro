/** @format */

// @flow
import * as React from "react"
import ReactTooltip from "react-tooltip"
import { Box } from "grommet"
const ToolTip = ({ id, message }) => (
  <ReactTooltip id={id}>
    <p>{message}</p>
  </ReactTooltip>
)

const ControlToolTips = () => {
  const tips = [
    { id: "prevColumn", message: "Previous column" },
    { id: "nextColumn", message: "Next column" },
    {
      id: "rawImg",
      message: "Raw image",
    },
    {
      id: "linedImg",
      message: "Whitespace calculated lines",
    },
    {
      id: "splitImg",
      message: "Raw split into 67 rows",
    },
    {
      id: "singleLineTable",
      message: "Raw split lines with OCR",
    },
  ]
  return (
    <Box>
      {tips.map((tip, index) => (
        <ToolTip id={tip.id} message={tip.message} key={index + 1 * 22} />
      ))}
    </Box>
  )
}

export default ControlToolTips
