import { useTheme } from '@mui/material'
import { useMediaQueries } from '@react-hook/media-query'
import { Breakpoint } from '@mui/system'

const simplifyMq = (mq: string) => mq.replace(/@media/g, '').trim()

type MediaQueryMatches = Record<Breakpoint, boolean>
const useMediaQueryMatches = () => {
  const theme = useTheme()

  const mqs = useMediaQueries({
    xs: simplifyMq(theme.breakpoints.up('xs')),
    sm: simplifyMq(theme.breakpoints.up('sm')),
    md: simplifyMq(theme.breakpoints.up('md')),
    lg: simplifyMq(theme.breakpoints.up('lg')),
    xl: simplifyMq(theme.breakpoints.up('xl')),
  })

  return mqs.matches
}

type ResponsiveValues<ValueT> = Partial<Record<Breakpoint, ValueT>>

const useResponsive = () => {
  const matches = useMediaQueryMatches()

  return <ValueT, DefaultValueT extends ValueT | null>(
    responsiveValues: ResponsiveValues<ValueT>,
    defaultValue?: DefaultValueT,
  ):
    | ValueT
    | (typeof defaultValue extends null | undefined
        ? DefaultValueT | null
        : DefaultValueT) => {
    const lastMatchingValue = (
      Object.entries(matches) as [Breakpoint, boolean][]
    )
      .reverse()
      .filter(([, match]) => match)
      .map(([breakpoint]) => responsiveValues[breakpoint])
      .find((matchingValue) => matchingValue != null)

    return (lastMatchingValue ?? defaultValue ?? null) as
      | ValueT
      | (typeof defaultValue extends null | undefined
          ? DefaultValueT | null
          : DefaultValueT)
  }
}

export { useMediaQueryMatches, useResponsive }

export type { MediaQueryMatches, ResponsiveValues }
