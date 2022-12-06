import { createTheme, ThemeOptions } from '@mui/material/styles'
import { Palette } from '@mui/material'
import * as colors from '@mui/material/colors'
import { PaletteMode } from '@mui/material'
import { FontGender } from './font'
import {
  TypographyOptions,
  Variant,
  VariantFontStyle,
} from '@mui/material/styles/createTypography'
import { mapValues } from 'lodash'

interface CustomColors {
  intro: string
  terminal: string
  flowNode: string
  header: string
  tooltip: string
}

const defaultAdditionalBackgroundMapping: Record<PaletteMode, CustomColors> = {
  light: {
    terminal: colors.common.white,
    flowNode: colors.common.white,
    intro: colors.grey[50],
    header: colors.grey[50],
    tooltip: colors.grey[50],
  },
  dark: {
    terminal: colors.common.black,
    flowNode: colors.common.black,
    intro: '#303030',
    header: '#303030',
    tooltip: '#303030',
  },
}

const defaultFamilies: Record<FontGender, string> = {
  sansSerif:
    '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, Ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
  serif:
    '"Iowan Old Style", "Apple Garamond", Baskerville, "Times New Roman", "Droid Serif", Times, "Source Serif Pro", serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: 'Menlo, Consolas, Monaco, "Liberation Mono", "Lucida Console", monospace',
}

const defaultWeights = {
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
}

const defaultFontStyles: Record<FontGender, VariantFontStyle> = {
  sansSerif: {
    fontFamily: defaultFamilies.sansSerif,
    fontGender: 'sansSerif',
    ...defaultWeights,
  },
  serif: {
    fontFamily: defaultFamilies.serif,
    fontGender: 'serif',
    ...defaultWeights,
  },
  mono: {
    fontFamily: defaultFamilies.mono,
    fontGender: 'mono',
    ...defaultWeights,
  },
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
  overline: 'sansSerif',
}

export const customDark = {
  background: defaultAdditionalBackgroundMapping.dark,
}

export const customLight = {
  background: defaultAdditionalBackgroundMapping.light,
}

export const createMuiCustomTheme = (options: ThemeOptions) => {
  // const darkOrLight = options.palette?.mode ?? "light";

  const typographyFunction =
    typeof options.typography === 'function'
      ? options.typography
      : () => options.typography as TypographyOptions | undefined

  return createTheme({
    ...options,
    palette: {
      ...options.palette,
      background: {
        ...options.palette?.background,
      },
    },
    typography: (palette: Palette) => {
      const optionsTypography = typographyFunction(palette)

      const typographyOptions: TypographyOptions = {
        ...optionsTypography,
        ...{
          variants: {
            ...optionsTypography?.variants,
            ...mapValues(
              defaultFontStyles,
              (defaultDefinition, gender: FontGender) => ({
                ...defaultDefinition,
                ...optionsTypography?.variants?.[gender],
              }),
            ),
          },
          variantsMapping: {
            ...defaultMappings,
            ...optionsTypography?.variantsMapping,
          },
        },
      }

      return typographyOptions
    },
  })
}
