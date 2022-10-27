import { useTheme } from '@mui/material'
import { useMediaQueries } from '@react-hook/media-query'
import { Breakpoint } from '@mui/system'
import { findLast } from 'lodash'

type MediaQueryMatches = Record<Breakpoint, boolean>
const useMediaQueryMatches = () => {
  const theme = useTheme()

  const mqs = useMediaQueries({
    xs: theme.breakpoints.up('xs'),
    sm: theme.breakpoints.up('sm'),
    md: theme.breakpoints.up('md'),
    lg: theme.breakpoints.up('lg'),
    xl: theme.breakpoints.up('xl')
  })

  return mqs.matches
}

type ResponsiveValues<ValueT> = Partial<Record<Breakpoint, ValueT>>
const useResponsive = () => {
  const theme = useTheme()

  const matches = useMediaQueryMatches()

  return <P, DefaultT = typeof undefined>(
    responsiveValues: ResponsiveValues<P>,
    defaultValue?: DefaultT,
  ) => {
    const match = findLast(
      theme.breakpoints.keys,
      (bp) => matches[bp] && responsiveValues[bp] != null,
    )

    return match ? responsiveValues[match] : defaultValue
  }
}

export { useMediaQueryMatches, useResponsive }

export type { MediaQueryMatches, ResponsiveValues }
