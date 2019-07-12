/** @format */

import * as React from "react"
import { Box, Anchor } from "grommet"
import styled from "styled-components"
import { Github, Twitter, MailOption } from "grommet-icons"

const StyledAnchor = styled(Anchor)`
  svg {
    padding: 0.5em;
  }
  svg:hover {
    box-shadow: 0 0 1px 1px #777777;
  }
`
const ContactDetails = ({ showModal }: { showModal: boolean => void }) => (
  <Box
    gridArea="contacts"
    gap="medium"
    pad="medium"
    direction="row"
    align="center"
    margin={{ top: "auto", bottom: "medium" }}
  >
    <StyledAnchor
      color="accent-1"
      icon={<Github size="large" />}
      href="https://github.com/litewarp/patent_pro"
    />
    <StyledAnchor
      color="accent-1"
      icon={<Twitter size="large" />}
      href="https://twitter.com/litewarp"
    />
    <StyledAnchor
      color="accent-1"
      icon={<MailOption size="large" />}
      onClick={() => showModal(true)}
    />
  </Box>
)

export default ContactDetails
