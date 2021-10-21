import { Typography, TypographyProps } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles<Theme>((theme) => ({
  title: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.variants[theme.typography.variantsMapping.h3].fontWeightRegular,
    textAlign: 'center'
  }
}))

export const IntroTitle: FunctionComponent<TypographyProps<'h1'>> = (props) => {
  const classes = useStyles()

  const {
    className,
    ...typographyProps
  } = props

  return (
    <Typography
      variant='h2'
      {...typographyProps}
      className={clsx(classes.title, className)}
      component='h1'
    >
      <strong>Cyril</strong> CHAPON
    </Typography>
  )
}
