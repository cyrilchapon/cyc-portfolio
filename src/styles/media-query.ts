import { useMediaQuery, useTheme } from "@material-ui/core"
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints"

type MediaQueryMatches = Record<Breakpoint, boolean>
const useMediaQueryMatches = () => {
  const theme = useTheme()

  const mediaQueryMatchesEntries = (Object.entries(theme.breakpoints.values) as [Breakpoint, number][])
    .map(([bp, bpx]) => {
      const match = bpx === 0 || useMediaQuery(theme.breakpoints.up(bp))
      return [bp, match]
    }) as [Breakpoint, boolean][]

  const mediaQueryMatches = Object.fromEntries(mediaQueryMatchesEntries)

  return mediaQueryMatches as MediaQueryMatches
}

type MediaQueryValueMatch<T extends number | string> = [T, Breakpoint]
const useMediaQueryValue = <T extends number | string>(values: Partial<Record<Breakpoint, T | null>>): MediaQueryValueMatch<T> | null => {
  const theme = useTheme()

  const lastMatchingBreakpoint = (Object.entries(theme.breakpoints.values) as [Breakpoint, number][])
    .reduce((acc, [bp, bpx]) => {
      const match = (bpx === 0) || useMediaQuery(theme.breakpoints.up(bp))
      const valueDeclared = bp in values && values[bp] != null

      if (match && valueDeclared) {
        acc = bp
      }

      return acc
    }, null as Breakpoint | null)

  const lastMatchingValue = (lastMatchingBreakpoint != null)
    ? [values[lastMatchingBreakpoint]!, lastMatchingBreakpoint[0]] as MediaQueryValueMatch<T>
    : null

  // const lastMatchingMqValue = (Object.entries(theme.breakpoints.values) as unknown as [Breakpoint, number][]).reduce((acc, [bp, bpx]) => {
  //   const match = (bpx === 0) || useMediaQuery(theme.breakpoints.up(bp))
  //   const valueDeclared = bp in values && values[bp] != null

  //   if (match && valueDeclared) {
  //     acc = [values[bp] as T, bp] as MediaQueryValueMatch<T>
  //   }

  //   return acc
  // }, null as MediaQueryValueMatch<T> | null)

  return lastMatchingValue
}

export {
  useMediaQueryMatches,
  useMediaQueryValue
}

export type {
  MediaQueryMatches,
  MediaQueryValueMatch
}
