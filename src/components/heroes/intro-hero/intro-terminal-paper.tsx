import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import { visuallyHidden } from '@mui/utils'
import Typed from 'react-typed'
import { FunctionComponent } from 'react'
import { TerminalPaperBase, TerminalPaperBaseProps } from '$components/papers/terminal-paper'

const useStyles = makeStyles<Theme>((theme) => ({
  terminalTypo: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.variants.mono.fontWeightMedium,
    fontFamily: theme.typography.variants.mono.fontFamily,
    fontSize: theme.typography.variants.mono.fontSize
  }
}))

interface TerminalPaperProps extends TerminalPaperBaseProps {
  strings: string[]
}

export const TerminalPaper: FunctionComponent<TerminalPaperProps> = (props) => {
  const classes = useStyles()

  const {
    strings,
    ...terminalPaperBaseProps
  } = props

  return (
    <TerminalPaperBase initialLines={2} {...terminalPaperBaseProps}>
      <Typography component='div' className={classes.terminalTypo}>
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
      </Typography>
    </TerminalPaperBase>
  )
}
