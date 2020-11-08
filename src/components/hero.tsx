// import {
//   Theme,
//   ThemeColorName,
//   snapChild,
//   SnapChildProps
// } from '$styles'

import { Box, BoxProps, makeStyles, StyleRules, Theme } from '@material-ui/core'
import { CreateCSSProperties, CSSProperties } from '@material-ui/core/styles/withStyles'
import { FunctionComponent } from 'react'
import { mapValues, omit } from 'lodash'
import type { PropsCssFunc, PropsFunc } from '$styles'

export interface HeroProps extends BoxProps {
  escapeHeader?: boolean
}

interface WithMinHeight {
  minHeight: any
}

const maybePxToPx = (value?: number | string) => (
  typeof value === 'number'
    ? `${value}px`
    : (value != null
      ? value
      : '0'
    )
)

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

// export const Hero = styled('section')<HeroProps & SnapChildProps>`
//   background-color: ${props => getColor(props.theme)(props.color)};
//   height: ${props => getHeight(props.theme)(props.escapeHeader)};

//   ${snapChild}

//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `

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
    className={`${classes.hero} ${className}`}
  />
}
