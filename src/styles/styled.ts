import _styled, { CreateStyled } from '@emotion/styled'
import type { Theme } from './theme'

type ThemedStyled = CreateStyled<Theme>

const styled = _styled as ThemedStyled

export default styled
export type { ThemedStyled }
export { styled }
