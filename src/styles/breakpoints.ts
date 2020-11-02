import { css, Interpolation } from '@emotion/core'
import { clamp, isString } from 'lodash'

interface BreakpointDefinition {
  breakpoint?: number | null
  space: number | string
}

interface MobileBreakpointDefinition extends BreakpointDefinition {
  breakpoint?: null
}

interface DefinedBreakpointDefinition extends BreakpointDefinition {
  breakpoint: number
}

const mq = (breakpoint: number) => `@media (min-width: ${breakpoint}px)`

const _cleanSpace = (space: string | number): number => isString(space) ? _stripPx(space) : space
const _stripPx = (px: string): number => parseInt(px.replace('px', ''), 10)

const _generateMarginForBreakpoint = (
  currentBp: BreakpointDefinition
): Interpolation => ({
  marginLeft: currentBp.space,
  marginRight: currentBp.space
})

const _generateMaxWidthForBreakpoint = (
  currentBp: DefinedBreakpointDefinition,
  nextBp?: DefinedBreakpointDefinition | null
): Interpolation => ({
  width: currentBp.breakpoint - _cleanSpace(currentBp.space) * 2,
    // ? (prevBp ?? currentBp).breakpoint + _cleanSpace((prevBp ?? currentBp).space),
    // ? nextBp.breakpoint - _cleanSpace(currentBp.space) * 2
    // : currentBp.breakpoint - _cleanSpace(currentBp.space) * 2,
  marginLeft: 'auto',
  marginRight: 'auto'
})

const generateContainerStyles = (
  breakpointDefinitions: [MobileBreakpointDefinition, ...DefinedBreakpointDefinition[]],
  fluidThreshold?: number
) => {
  if (breakpointDefinitions.length === 0) return null

  const cleanFluidThreshold = clamp((fluidThreshold ?? 1), 1, breakpointDefinitions.length - 1)

  const [
    mobileBreakpointDefinition,
    ...definedBreakpointDefinitions
  ] = breakpointDefinitions

  const mobileStyle: Interpolation = _generateMarginForBreakpoint(mobileBreakpointDefinition)

  const definedStyles = definedBreakpointDefinitions.reduce(
    (acc, breakpointDefinition, index) => {
      return {
        ...acc as object,
        [mq(breakpointDefinition.breakpoint)]: index + 1 < cleanFluidThreshold
          ? _generateMarginForBreakpoint(
            breakpointDefinition
          )
          : _generateMaxWidthForBreakpoint(
            breakpointDefinition,
            definedBreakpointDefinitions[index + 1]
          )
      }
    }, {} as Interpolation
  )

  return css({
    ...mobileStyle as object,
    ...definedStyles as object
  })
}

const generateFluidContainerStyles = (
  breakpointDefinitions: [MobileBreakpointDefinition, ...DefinedBreakpointDefinition[]]
) => {
  if (breakpointDefinitions.length === 0) return null

  const [
    mobileBreakpointDefinition,
    ...definedBreakpointDefinitions
  ] = breakpointDefinitions

  const mobileStyle: Interpolation = _generateMarginForBreakpoint(mobileBreakpointDefinition)

  const definedStyles = definedBreakpointDefinitions.reduce(
    (acc, breakpointDefinition) => {
      return {
        ...acc as object,
        [mq(breakpointDefinition.breakpoint)]: _generateMarginForBreakpoint(breakpointDefinition)
      }
    }, {} as Interpolation
  )

  return css({
    ...mobileStyle as object,
    ...definedStyles as object
  })
}

export {
  generateContainerStyles,
  generateFluidContainerStyles
}

export type {
  BreakpointDefinition,
  MobileBreakpointDefinition,
  DefinedBreakpointDefinition
}
