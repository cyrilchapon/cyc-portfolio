import { css } from '@emotion/core'
import { WithTheme } from '@emotion/styled'
import { Theme } from './theme'

export interface SnapParentProps {
  snap?: boolean
}

export const snapParent = (props: WithTheme<SnapParentProps, Theme>) => css`
  ${(props.snap ?? false) ? 'scroll-snap-type: y mandatory;' : null}
`
