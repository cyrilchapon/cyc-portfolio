import { Typography, TypographyProps } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles<Theme>((theme) => ({
  subtitle: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    // fontSize: theme.typography.h4.fontSize,
    lineHeight: 1.5,
    '&:before': {
      content: 'initial'
    }
  },
  subtitleStrong: {
    fontWeight: theme.typography.variants.sansSerif.fontWeightBold
  }
}))

export const IntroSubtitle: FunctionComponent<TypographyProps<'div'>> = (props) => {
  const classes = useStyles()

  const {
    className,
    ...typographyProps
  } = props

  return (
    <Typography
      variant='subtitle1'
      {...typographyProps}
      className={clsx(classes.subtitle, className)}
      component='div'
    >
      CEO &amp; founder @ Homère
      <br />
      Consultant Stratégie Produit
    </Typography>
  )
}
