import { makeStyles, Typography } from '@material-ui/core'
import { TerminalPaperBase, TerminalPaperBaseProps } from './_terminal-paper-base'
import Typed from 'react-typed'
import { FunctionComponent } from 'react'

const useStyles = makeStyles((theme) => ({
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
              variant='srOnly'
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
