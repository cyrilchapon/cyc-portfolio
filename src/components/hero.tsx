import { Box, BoxProps, makeStyles, Theme } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { mapValues, omit } from 'lodash'
import { maybePxToPx, PropsCssFunc } from '$styles'
import clsx from 'clsx'

export interface HeroProps extends BoxProps {
  escapeHeader?: boolean
}

interface WithMinHeight {
  minHeight: any
}

const getPaddingTop = (theme: Theme): PropsCssFunc<HeroProps> => ({ escapeHeader }) => (
  (escapeHeader ?? false)
    ? {
      paddingTop: `calc(${theme.spacing(4)}px + ${maybePxToPx(theme.mixins.toolbar.minHeight)})`,
      ...(mapValues(
        omit(theme.mixins.toolbar, 'minHeight'),
        (value: WithMinHeight) => ({
          paddingTop: `calc(${theme.spacing(4)}px + ${maybePxToPx(value.minHeight)})`
        })
      ))
    }
    : {
      paddingTop: theme.spacing(4)
    }
)

const useStyles = makeStyles<Theme, HeroProps, 'hero'>((theme) => {
  return {
    hero: (props) => ({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: `100vh`,
      paddingBottom: theme.spacing(4),
      ...getPaddingTop(theme)(props)
    })
  }
})

export const Hero: FunctionComponent<HeroProps> = (props) => {
  const {
    escapeHeader,
    className,
    ...restProps
  } = props

  const classes = useStyles({ escapeHeader })

  return <Box
    {...restProps}
    className={clsx(classes.hero, className)}
  />
}
