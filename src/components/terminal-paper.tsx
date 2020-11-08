import { fade, makeStyles, Paper, PaperProps, Theme } from '@material-ui/core'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

interface TerminalPaperProps extends PaperProps {
  initialLines?: number
}

const useStyles = makeStyles<Theme, TerminalPaperProps, 'paper'>((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: props => (
      theme.spacing(
        (theme.typography.subtitle1.lineHeight as number) * (props.initialLines ?? 1) * 2
      ) + theme.spacing(2)
    ),
    backgroundColor: theme.palette.background.terminal
  }
}))


const TerminalPaper: FunctionComponent<TerminalPaperProps> = (props) => {
  const classes = useStyles(props)

  const {
    className,
    ...restProps
  } = props

  return (
    <Paper
      variant='outlined'
      className={clsx(className, classes.paper)}
      {...restProps}
    />
  )
}

export { TerminalPaper }
export type { TerminalPaperProps }
