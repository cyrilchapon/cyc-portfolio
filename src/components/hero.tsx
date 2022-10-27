import { Box, BoxProps, styled, Theme } from '@mui/material'
import { mapValues, omit } from 'lodash'
import { maybePxToPx } from '$styles'
import { CSSProperties } from '@mui/styled-engine'

export interface HeroProps extends BoxProps {
  escapeHeader?: boolean
}

interface WithMinHeight {
  minHeight: number | string
}

export const getPaddingTop = (theme: Theme) => (escapeHeader: boolean): CSSProperties => (
  (escapeHeader ?? false)
    ? {
      paddingTop: `calc(${maybePxToPx(theme.spacing(4))} + ${maybePxToPx(theme.mixins.toolbar.minHeight)})`,
      ...(mapValues(
        omit(theme.mixins.toolbar, 'minHeight'),
        (value: WithMinHeight) => ({
          paddingTop: `calc(${maybePxToPx(theme.spacing(4))} + ${maybePxToPx(value.minHeight)})`
        })
      ))
    }
    : {
      paddingTop: theme.spacing(4)
    }
)

export const Hero = styled(Box, {
  shouldForwardProp: p => p !== 'escapeHeader'
})<HeroProps>(({ theme, escapeHeader }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: `100vh`,
  paddingBottom: theme.spacing(4),
  ...getPaddingTop(theme)(escapeHeader ?? false)
}))
