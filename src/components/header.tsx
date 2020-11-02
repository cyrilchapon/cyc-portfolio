import { styled } from '$styles'
import { Header as _Header } from '@sumup/circuit-ui'
import { snapChild, SnapChildProps } from '$styles'

export const Header = styled<typeof _Header, SnapChildProps>(_Header)`
  background-color: ${props => props.theme.colors.header};
  min-height: ${props => props.theme.spacings.header};
  ${props => snapChild(props)}
`
