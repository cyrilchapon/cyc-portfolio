import type { Theme } from '@sumup/design-tokens'
import { light } from '@sumup/design-tokens'

import {
  composeStack,
  FONTS
} from './font'

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
  }
}

export default theme
export { theme }
export type { Theme }
