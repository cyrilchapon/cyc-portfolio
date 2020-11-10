import { responsiveFontSizes } from '@material-ui/core'
import { createMuiTheme, ThemeOptions, Theme, fade } from '@material-ui/core/styles'
import { Palette } from '@material-ui/core/styles/createPalette'
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography'
import { createMuiCustomTheme } from './custom-theme'
import { composeStack, FontDefinition, FONTS } from './font'

const composeMuiFontDefinition = (fontDefinition: FontDefinition) => ({
  fontFamily: composeStack(fontDefinition),
  fontWeightLight: fontDefinition.weights.light,
  fontWeightRegular: fontDefinition.weights.regular,
  fontWeightMedium: fontDefinition.weights.medium,
  fontWeightBold: fontDefinition.weights.bold,
  fontGender: fontDefinition.gender
})

const sansSerifMuiFontDefinition = composeMuiFontDefinition(FONTS.sansSerif)
const serifMuiFontDefinition = composeMuiFontDefinition(FONTS.serif)
const monoMuiFontDefinition = composeMuiFontDefinition(FONTS.mono)

const capsStyles: TypographyStyleOptions = {
  textTransform: 'uppercase'
}

const smallCapsStyles: TypographyStyleOptions = {
  textTransform: 'lowercase',
  fontVariant: 'small-caps'
}

const backgroundImageBack = 'https://images.prismic.io/cyc-portfolio/96cdde6f-f250-4b5b-a228-2a9f40400ede_wonderful-mountains-in-fall-colors-picjumbo-com.jpg?w=1200&auto=compress,format,enhance&q=30&fit=crop'
const backgroundImage = 'https://images.prismic.io/cyc-portfolio/96cdde6f-f250-4b5b-a228-2a9f40400ede_wonderful-mountains-in-fall-colors-picjumbo-com.jpg?w=1200&auto=compress,format,enhance&q=30&fit=crop&blend-color=000000&blend-mode=normal&blend-alpha=85'

// TODO fix custom (mono)
const theme: Theme = responsiveFontSizes(createMuiCustomTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#E02F58'
      // main: '#1BB16D'
    },
    secondary: {
      main: '#545EF0'
    },
    background: {
      default: '#1A1A1A',
      intro: 'transparent',
      terminal: fade('#0A0A0A', 0.5),
      header: fade('#000000', 0.85)
    },
    text: {
      semi: 'rgba(255, 255, 255, 0.9)',
      light: {
        primary: '#FFFFFF',
        semi: 'rgba(255, 255, 255, 0.9)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
        hint: 'rgba(255, 255, 255, 0.5)'
      },
      dark: {
        primary: 'rgba(0, 0, 0, 0.87)',
        semi: 'rgba(0, 0, 0, 0.7)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)'
      }
    }
  },
  typography: (palette: Palette) => ({
    ...sansSerifMuiFontDefinition,
    variants: {
      sansSerif: sansSerifMuiFontDefinition,
      serif: serifMuiFontDefinition,
      mono: monoMuiFontDefinition
    },
    variantsMapping: {
      body1: 'mono',
      body2: 'mono',
      h1: 'serif',
      h2: 'serif',
      h3: 'serif',
      h4: 'serif',
      h5: 'serif',
      h6: 'serif',
      subtitle1: 'serif',
      subtitle2: 'serif',
      button: 'sansSerif',
      caption: 'mono',
      overline: 'mono'
    },
    h1: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.regular,
      color: palette.text.semi,
      // ...smallCapsStyles
    },
    h2: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.medium,
      color: palette.text.semi,
      // ...smallCapsStyles
    },
    h3: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.bold,
      color: palette.text.semi,
      // ...smallCapsStyles
    },
    h4: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.bold,
      color: palette.text.semi,
      ...smallCapsStyles
    },
    h5: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.bold,
      color: palette.text.semi,
      // ...smallCapsStyles
    },
    h6: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.bold,
      color: palette.text.semi,
      ...smallCapsStyles
    },
    subtitle1: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.regular,
      fontSize: 20,
      color: palette.text.secondary,
      '&:before': {
        content: '"—"'
      }
    },
    subtitle2: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.regular,
      fontSize: 16,
      color: palette.text.secondary,
      '&:before': {
        content: '"— "'
      }
    },
    button: {
      fontFamily: composeStack(FONTS.sansSerif),
      fontWeight: FONTS.sansSerif.weights.bold
    }
  }),
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: `url('${backgroundImage}')`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          // Don't scroll
          backgroundAttachment: 'fixed',
          // Fill
          backgroundSize: 'cover',
          // Fallback
          backgroundColor: 'black'
        }
      }
    }
  }
}))

export default theme
export { theme }
export type { Theme }
