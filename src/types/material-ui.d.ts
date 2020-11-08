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
  interface TypeBackground {
    intro: string
    terminal: string
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
    variants: Record<FontGender, VariantFontStyleOptions>
    variantsMapping: Record<Variant, FontGender>
  }
}
