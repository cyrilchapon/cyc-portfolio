import { Paper, PaperProps } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles<Theme>(theme => ({
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
