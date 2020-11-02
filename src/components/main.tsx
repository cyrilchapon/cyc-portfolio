import { styled } from '$styles'
import { snapParent, SnapParentProps } from '$styles'

export const Main = styled<'main', SnapParentProps>('main')`
  ${props => snapParent(props)}
`
