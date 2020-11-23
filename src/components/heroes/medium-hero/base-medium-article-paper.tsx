import { makeStyles, Paper, PaperProps } from '@material-ui/core'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles(theme => ({
  articlePaper: {
    padding: theme.spacing(3)
  }
}))

const BaseMediumArticlePaper: FunctionComponent<PaperProps> = (props) => {
  const {
    className,
    ...paperProps
  } = props

  const classes = useStyles()

  return (
    <Paper
      {...paperProps}
      className={clsx(className, classes.articlePaper)}
    />
  )
}

export { BaseMediumArticlePaper }
