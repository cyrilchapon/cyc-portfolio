import { makeStyles, Typography, TypographyProps } from '@material-ui/core'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles((theme) => ({
  subtitle: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    textTransform: 'lowercase',
    fontVariant: 'small-caps',
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.variants.sansSerif.fontFamily,
    fontWeight: theme.typography.variants.sansSerif.fontWeightLight,
    lineHeight: 1.3,
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
      Consultant <strong className={classes.subtitleStrong}>Stratégie Produit</strong>
      <br />
      &amp; <strong className={classes.subtitleStrong}>CTO</strong> freelance
    </Typography>
  )
}
