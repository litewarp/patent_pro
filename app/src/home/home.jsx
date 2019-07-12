/** @format */

import * as React from "react"
import { shallowEqual, useSelector, useDispatch } from "react-redux"
import { Box, Button, Grid, Heading } from "grommet"
import styled from "styled-components"
import MessageModal from "./_messages"
import ContactDetails from "./_contacts"
import BulletPoints from "./_bullets"
import ImageMockups from "./_images"
import { loadPatentAndColumns as fetchModelPatent } from "../_redux/patentActions"

const Title = styled(Heading)`
  font-family: brandon-grotesque, sans-serif;
  font-weight: 900;
`
const LandingPage = () => {
  //lifecycle
  React.useEffect(() => dispatch(fetchModelPatent("7629705")), [])
  //layout state
  const [modal, showModal] = React.useState(false)
  //redux
  const dispatch = useDispatch()
  const column = useSelector(({ patent }) => patent.columns[2])
  //render
  return (
    <Grid
      fill
      justify="center"
      rows={["xsmall", "3/4", "xxsmall"]}
      columns={["1/2", "1/2"]}
      areas={[
        { name: "marquee", start: [0, 0], end: [1, 0] },
        { name: "bullets", start: [0, 1], end: [0, 1] },
        { name: "images", start: [1, 1], end: [1, 1] },
        { name: "contacts", start: [0, 2], end: [1, 2] },
      ]}
    >
      <Box gridArea="marquee" align="center" gap="small" margin="small">
        <Title margin="none" level={1}>
          PATENT PRO
        </Title>
        <Heading level={3} margin="none">
          Automatically generate snippets from US Patents
        </Heading>
      </Box>
      <BulletPoints />
      <ImageMockups patentProps={column && column.attributes} />
      <ContactDetails />
      {modal && <MessageModal showModal={showModal} modal={modal} />}
    </Grid>
  )
}

export default LandingPage