import '@mui/material'
import { FontStyle, Variant } from '@mui/material'
import { FontGender } from '../styles/font'

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    intro: string
    terminal: string
    header: string
    tooltip: string
  }

  export type StrongerTonalOffset =
  | number
  | {
      lighter: number
      darker: number
    }

  interface Palette {
    strongerTonalOffset: StrongerTonalOffset
  }

  interface PaletteOptions {
    strongerTonalOffset?: StrongerTonalOffset
  }

  export type SimpleTypeText = Omit<TypeText, 'light' | 'dark'>

  interface TypeText {
    light: SimpleTypeText
    dark: SimpleTypeText
    semi: string
  }
}

declare module '@mui/material/styles/createTypography' {
  interface VariantFontStyle extends Omit<FontStyle, 'fontSize' | 'htmlFontSize'> {
    fontGender: FontGender
  }

  interface Typography {
    variants: Record<FontGender, FontStyle>
    variantsMapping: Record<Variant, FontGender>
  }

  interface VariantFontStyleOptions extends Partial<VariantFontStyle> {}

  interface TypographyOptions {
    variants?: Partial<Record<FontGender, Partial<VariantFontStyleOptions>>>
    variantsMapping?: Partial<Record<Variant, Partial<FontGender>>>
  }
}

declare module '@mui/material/styles/createMuiTheme' {
  import { Typography, TypographyOptions } from '@mui/material/styles/createTypography'

  interface Theme {
    typography: Typography
  }

  interface ThemeOptions {
    typographyOptions?: TypographyOptions
  }
}
