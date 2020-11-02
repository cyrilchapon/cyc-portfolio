import type { Theme as _Theme } from '@sumup/design-tokens'
import { light } from '@sumup/design-tokens'

import {
  composeStack,
  FONTS
} from './font'

type Theme = _Theme & {
  colors: {
    header: string
  },
  spacings: {
    header: string,
    eta: string,
    theta: string,
    iota: string,
  }
}

const theme: Theme = {
  ...light,
  fontStack: {
    ...light.fontStack,
    default: composeStack(FONTS.sansSerif),
    mono: composeStack(FONTS.mono)
  },
  fontWeight: {
    ...light.fontWeight,
    regular: `${FONTS.sansSerif.weights.regular}`,
    bold: `${FONTS.sansSerif.weights.bold}`
  },
  colors: {
    ...light.colors,
    header: light.colors.r500
  },
  spacings: {
    ...light.spacings,
    eta: '100px',
    theta: '150px',
    iota: '200px',
    header: '64px'
  }
}

type ThemeColorName = keyof Theme['colors']

export default theme
export { theme }
export type { Theme, ThemeColorName }
