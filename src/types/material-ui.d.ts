// import { Theme, ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
// import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import '@material-ui/core'
import { FontStyle, Variant } from '@material-ui/core'
import { FontGender } from '../styles/font'

// declare module '@material-ui/core/styles/createMuiTheme' {
//   interface Theme {
//     palette: {
//       background: {
//         terminal: React.CSSProperties['backgroundColor']
//       }
//     }
//   }
//   // allow configuration using `createMuiTheme`
//   interface ThemeOptions {
//     palette?: {
//       background?: {
//         terminal?: React.CSSProperties['backgroundColor']
//       }
//     }
//   }
// }

declare module '@material-ui/core/styles/createPalette' {
  type SimpleTypeBackground = Omit<TypeBackground, 'light' | 'dark'>

  interface TypeBackground {
    intro: string
    terminal: string
    header: string
    light: SimpleTypeBackground
    dark: SimpleTypeBackground
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
