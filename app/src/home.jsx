/** @format */

import * as React from "react"
import {
  Anchor,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Text,
} from "grommet"
import {
  BlockQuote,
  Bookmark,
  Columns,
  DocumentPdf,
  Send,
  Github,
  MailOption,
  Twitter,
} from "grommet-icons"
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
const Title = styled(Heading)`
  font-family: brandon-grotesque, sans-serif;
  font-weight: 900;
`

const BulletPoint = ({ icon, text }) => (
  <Box direction="row" align="center" justify="start" gap="large">
    {icon}
    <Text>{text}</Text>
  </Box>
)

const LandingPage = () => {
  const [modal, showModal] = React.useState(false)
  return (
    <Box fill align="center">
      <Title level={1}>PATENT PRO</Title>
      <Heading level={3}>A US Patent Parser</Heading>
      <Box gap="small">
        <BulletPoint
          icon={<Columns />}
          text="Split patents into columns and extract the text"
        />
        <BulletPoint
          icon={<BlockQuote />}
          text="Copy quotations with proper column and line numbers"
        />
        <BulletPoint
          icon={<Bookmark />}
          text="Add annotations and share them with colleagues"
        />
      </Box>
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
