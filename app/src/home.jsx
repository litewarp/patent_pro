/** @format */

import * as React from "react"
import { Anchor, Box, Button, Form, FormField, Heading, Layer } from "grommet"
import { Send, Github, MailOption, Twitter } from "grommet-icons"
import styled from "styled-components"
import EmailModal from "./_root/components/emailLayer"
const StyledAnchor = styled(Anchor)`
  svg {
    padding: 0.5em;
  }
  svg:hover {
    box-shadow: 0 0 1px 1px #777777;
  }
`
const LandingPage = () => {
  const [modal, showModal] = React.useState(false)
  return (
    <Box fill align="center">
      <Heading level={1}>Welcome to Patent Pro</Heading>
      <Heading level={3}>Enter a US Patent Number to Start</Heading>
      <Box
        gap="medium"
        pad="medium"
        direction="row"
        align="center"
        margin={{ top: "auto", bottom: "medium" }}
      >
        <StyledAnchor
          icon={<Github size="large" />}
          href="https://github.com/litewarp/patent_pro"
        />
        <StyledAnchor
          icon={<Twitter size="large" />}
          href="https://twitter.com/litewarp"
        />
        <StyledAnchor
          icon={<MailOption size="large" />}
          onClick={() => showModal(true)}
        />
      </Box>
      {modal && <EmailModal showModal={showModal} modal={modal} />}
    </Box>
  )
}

export default LandingPage
