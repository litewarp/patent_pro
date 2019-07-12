/** @format */

import * as React from "react"
import { Box, Button, Grid, Heading } from "grommet"
import styled from "styled-components"
import MessageModal from "./_messages"
import ContactDetails from "./_contacts"
import BulletPoints from "./_bullets"
import ImageMockups from "./_images"
const Title = styled(Heading)`
  font-family: brandon-grotesque, sans-serif;
  font-weight: 900;
`

const LandingPage = () => {
  const [modal, showModal] = React.useState(false)
  return (
    <Grid
      pad="large"
      fill
      justify="center"
      rows={["small", "small", "medium", "medium"]}
      columns={["1/2", "1/2"]}
      areas={[
        { name: "title", start: [0, 0], end: [1, 0] },
        { name: "subtitle", start: [0, 1], end: [1, 1] },
        { name: "bullets", start: [0, 2], end: [0, 2] },
        { name: "images", start: [1, 2], end: [1, 2] },
        { name: "contacts", start: [0, 3], end: [1, 3] },
      ]}
    >
      <Title gridArea="title" level={1}>
        PATENT PRO
      </Title>
      <Heading gridArea="subtitle" level={3}>
        Automatically generate snippets from US Patents
      </Heading>
      <BulletPoints />
      <ImageMockups />
      <ContactDetails />
      {modal && <MessageModal showModal={showModal} modal={modal} />}
    </Grid>
  )
}

export default LandingPage
