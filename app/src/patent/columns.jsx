/** @format */

import * as React from "react"
import { Box, Heading, Image } from "grommet"

const ColumnImage = ({ img, label }: { img: string, label: string }) => (
  <Box
    align="center"
    gap="small"
    fill="vertical"
    width="medium"
    margin={{ left: "small" }}
  >
    <Heading
      color="neutral-4"
      level={3}
      margin="none"
      pad="small"
      margin={{ bottom: "small" }}
    >
      {label}
    </Heading>
    <Image fit="contain" src={img} />
  </Box>
)

const Columns = ({
  activeColumn,
  setActiveColumn,
  columns,
}: {
  activeColumn: number,
  columns: Array<{}>,
}) => {
  const getColumn = number => {
    const results = columns.filter(col => col.attributes.number == number)
    return results && results[0]
  }
  const column = getColumn(activeColumn)
  return (
    <Box direction="row" pad="medium" wrap gap="medium" justify="center">
      <ColumnImage
        img={column && column.attributes.masterImgUrl}
        label="Raw Image"
      />
      <ColumnImage
        img={column && column.attributes.linedImgUrl}
        label="Algorithmic Split"
      />
      <ColumnImage
        img={column && column.attributes.splitImgUrl}
        label="Line Count Split"
      />
    </Box>
  )
}

export default Columns
