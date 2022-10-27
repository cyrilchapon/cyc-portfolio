import { styled, Typography, TypographyProps } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import Typed from 'react-typed'
import { FunctionComponent } from 'react'
import { TerminalPaperBase, TerminalPaperBaseProps } from '$components/papers/terminal-paper'

const TerminalTypography = styled(Typography)<TypographyProps<'div', { component: 'div' }>>(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: theme.typography.variants.mono.fontWeightMedium,
  fontFamily: theme.typography.variants.mono.fontFamily,
  fontSize: theme.typography.variants.mono.fontSize
}))

interface TerminalPaperProps extends TerminalPaperBaseProps {
  strings: string[]
}

export const TerminalPaper: FunctionComponent<TerminalPaperProps> = (props) => {
  const {
    strings,
    ...terminalPaperBaseProps
  } = props

  return (
    <TerminalPaperBase initialLines={2} {...terminalPaperBaseProps}>
      <TerminalTypography component='div'>
        &gt;{' '}
          {strings.length > 0 && (
            <Typography
              style={visuallyHidden}
            >
              {strings[0]}
            </Typography>
          )}

          <Typed
            contentType='html'
            strings={strings}
            backDelay={2000}
            backSpeed={10}
            typeSpeed={40}
            loop
          />
      </TerminalTypography>
    </TerminalPaperBase>
  )
}
