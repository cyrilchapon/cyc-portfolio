import '@mui/material'
import { FontStyle, Variant } from '@mui/material'
import { FontGender } from '../styles/font'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    intro: string
    terminal: string
    header: string
    tooltip: string
    paper: string
  }

  export type StrongerTonalOffset =
    | number
    | {
        lighter: number
        darker: number
      }

  interface Palette {
    strongerTonalOffset: StrongerTonalOffset
    neutral: Palette['primary']
  }

  interface PaletteOptions {
    strongerTonalOffset?: StrongerTonalOffset
    neutral?: PaletteOptions['primary']
  }

  export type SimpleTypeText = Omit<TypeText, 'paper'>

  interface TypeText {
    paper: SimpleTypeText
    semi: string
  }
}

declare module '@mui/material/styles/createTypography' {
  interface VariantFontStyle
    extends Omit<FontStyle, 'fontSize' | 'htmlFontSize'> {
    fontGender: FontGender
  }

  interface Typography {
    variants: Record<FontGender, FontStyle>
    variantsMapping: Record<Variant, FontGender>
  }

  type VariantFontStyleOptions = Partial<VariantFontStyle>

  interface TypographyOptions {
    variants?: Partial<Record<FontGender, Partial<VariantFontStyleOptions>>>
    variantsMapping?: Partial<Record<Variant, Partial<FontGender>>>
  }
}

declare module '@mui/material/styles/createMuiTheme' {
  import {
    Typography,
    TypographyOptions,
  } from '@mui/material/styles/createTypography'

  interface Theme {
    typography: Typography
  }

  interface ThemeOptions {
    typographyOptions?: TypographyOptions
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true
  }
}
