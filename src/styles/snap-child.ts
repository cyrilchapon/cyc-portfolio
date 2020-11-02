import { css, SerializedStyles } from '@emotion/core'
import { WithTheme } from '@emotion/styled'
import { Theme } from './theme'

export interface SnapChildProps {
  snapChild?: boolean
}

export const snapChild = (props: WithTheme<SnapChildProps, Theme>) => css`
  ${(props.snapChild ?? false) ? 'scroll-snap-align: start;' : null}
`
