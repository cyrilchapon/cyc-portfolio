import '@material-ui/core'
import { FontStyle, Variant } from '@material-ui/core'
import { FontGender } from '../styles/font'

declare module '@material-ui/core/styles/createPalette' {
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

declare module '@material-ui/core/styles/createTypography' {
  interface VariantFontStyle extends Omit<FontStyle, 'fontSize'> {
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

declare module '@material-ui/core/styles/createMuiTheme' {
  import { Typography, TypographyOptions } from '@material-ui/core/styles/createTypography'

  interface Theme {
    typography: Typography
  }

  interface ThemeOptions {
    typographyOptions?: TypographyOptions
  }
}
