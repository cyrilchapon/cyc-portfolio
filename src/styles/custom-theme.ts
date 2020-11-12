import { createMuiTheme, fade, ThemeOptions } from '@material-ui/core/styles'
import { dark, light, Palette, PaletteOptions } from '@material-ui/core/styles/createPalette'
import * as colors from '@material-ui/core/colors'
import { PaletteType } from '@material-ui/core'
import { FontGender } from './font'
import { TypographyOptions, Variant, VariantFontStyle } from '@material-ui/core/styles/createTypography'
import { mapValues } from 'lodash'

interface CustomColors {
  intro: string
  terminal: string
  header: string
}

const defaultAdditionalBackgroundMapping: Record<PaletteType, CustomColors> = {
  light: {
    terminal: colors.common.white,
    intro: colors.grey[50],
    header: colors.grey[50]
  },
  dark: {
    terminal: colors.common.black,
    intro: '#303030',
    header: '#303030'
  }
}

const defaultFamilies: Record<FontGender, string> = {
  sansSerif: '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  serif: '"Iowan Old Style", "Apple Garamond", Baskerville, "Times New Roman", "Droid Serif", Times, "Source Serif Pro", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'Menlo, Consolas, Monaco, "Liberation Mono", "Lucida Console", monospace'
}

const defaultWeights = {
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700
}

const defaultFontStyles: Record<FontGender, VariantFontStyle> = {
  sansSerif: {
    fontFamily: defaultFamilies.sansSerif,
    fontGender: 'sansSerif',
    ...defaultWeights
  },
  serif: {
    fontFamily: defaultFamilies.serif,
    fontGender: 'serif',
    ...defaultWeights
  },
  mono: {
    fontFamily: defaultFamilies.mono,
    fontGender: 'mono',
    ...defaultWeights
  }
}

const defaultMappings: Record<Variant, FontGender> = {
  body1: 'sansSerif',
  body2: 'sansSerif',
  h1: 'sansSerif',
  h2: 'sansSerif',
  h3: 'sansSerif',
  h4: 'sansSerif',
  h5: 'sansSerif',
  h6: 'sansSerif',
  subtitle1: 'sansSerif',
  subtitle2: 'sansSerif',
  button: 'sansSerif',
  caption: 'sansSerif',
  overline: 'sansSerif'
}

export const customDark = {
  background: defaultAdditionalBackgroundMapping.dark
}

export const customLight = {
  background: defaultAdditionalBackgroundMapping.light
}

export const createMuiCustomTheme = (options: ThemeOptions) => {
  const darkOrLight = options.palette?.type ?? 'light'

  const typographyFunction = typeof options.typography === 'function'
    ? options.typography
    : (palette: Palette) => options.typography as TypographyOptions | undefined

  return createMuiTheme({
    ...options,
    palette: {
      ...options.palette,
      background: {
        ...defaultAdditionalBackgroundMapping[darkOrLight],
        ...options.palette?.background,
        light: {
          ...defaultAdditionalBackgroundMapping.light,
          default: light.background.default,
          paper: light.background.paper,
          ...options.palette?.background?.light
        },
        dark: {
          ...defaultAdditionalBackgroundMapping.dark,
          default: dark.background.default,
          paper: dark.background.paper,
          ...options.palette?.background?.dark
        }
      }
    },
    typography: (palette: Palette) => {
      const optionsTypography = typographyFunction(palette)

      const typographyOptions: TypographyOptions = {
        ...optionsTypography,
        ...{
          variants: {
            ...optionsTypography?.variants,
            ...mapValues(defaultFontStyles, (defaultDefinition, gender: FontGender) => ({
              ...defaultDefinition,
              ...optionsTypography?.variants?.[gender]
            }))
          },
          variantsMapping: {
            ...defaultMappings,
            ...optionsTypography?.variantsMapping
          }
        }
      }

      return typographyOptions
    }
  })
}
