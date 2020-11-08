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

const getEscapeHeight = (theme: Theme): PropsCssFunc<HeroProps> => ({ escapeHeader }) => (
  (escapeHeader ?? false)
    ? {
      minHeight: `100vh`,
      paddingTop: theme.mixins.toolbar.minHeight,
      ...(mapValues(
        omit(theme.mixins.toolbar, 'minHeight'),
        (value: WithMinHeight) => ({
          minHeight: `100vh`,
          paddingTop: value.minHeight
        })
      ))
    }
    : {
      minHeight: '100vh'
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
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      ...getEscapeHeight(theme)(props)
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
