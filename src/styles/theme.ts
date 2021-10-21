import { responsiveFontSizes } from '@mui/material'
import { createTheme, ThemeOptions, Theme, alpha } from '@mui/material/styles'
import { Palette, PaletteOptions } from '@mui/material'
import { TypographyOptions, TypographyStyleOptions } from '@mui/material/styles/createTypography'
import { createMuiCustomTheme, customLight } from './custom-theme'
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

const loadingBackgroundImage = 'https://images.prismic.io/cyc-portfolio/96cdde6f-f250-4b5b-a228-2a9f40400ede_wonderful-mountains-in-fall-colors-picjumbo-com.jpg?w=1200&auto=compress,format,enhance&q=10&fit=crop&blend-color=000000&blend-mode=normal&blend-alpha=85'
const backgroundImage = 'https://images.prismic.io/cyc-portfolio/96cdde6f-f250-4b5b-a228-2a9f40400ede_wonderful-mountains-in-fall-colors-picjumbo-com.jpg?w=1920&auto=compress,format,enhance&q=80&fit=crop&blend-color=000000&blend-mode=normal&blend-alpha=85'

const getTypographyOptions = (palette: Palette): TypographyOptions => ({
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
  body1: {
    color: palette.text.primary
  },
  body2: {
    color: palette.text.primary
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
    // ...smallCapsStyles
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
      content: '"— "'
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
    fontWeight: FONTS.sansSerif.weights.bold,
    color: palette.text.primary
  },
  caption: {
    color: palette.text.semi
  },
  overline: {
    color: palette.text.semi
  }
})

const darkTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    tonalOffset: {
      light: 0.5,
      dark: 0.2
    },
    primary: {
      main: '#E02F58'
      // main: '#1BB16D'
    },
    secondary: {
      // main: '#FFFFFF'
      main: '#1BB16D'
      // main: '#FFFFFF'
    },
    background: {
      default: '#1A1A1A',
      intro: 'transparent',
      terminal: alpha('#0A0A0A', 0.5),
      header: alpha('#000000', 0.85),
      tooltip: alpha('#FFFFFF', 0.85),
      paper: '#0A0A0A'
    },
    text: {
      primary: '#FFFFFF',
      semi: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      light: {
        primary: '#FFFFFF',
        semi: 'rgba(255, 255, 255, 0.9)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)'
      },
      dark: {
        primary: 'rgba(0, 0, 0, 0.87)',
        semi: 'rgba(0, 0, 0, 0.7)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)'
      }
    }
  },
  typography: getTypographyOptions
}

const lightTheme: ThemeOptions = {
  palette: {
    mode: 'light',
    tonalOffset: {
      light: 0.5,
      dark: 0.2
    },
    primary: {
      main: '#E02F58'
    },
    secondary: {
      main: '#1BB16D'
    },
    background: {
      default: 'rgb(250, 250, 250)',
      intro: customLight.background.intro,
      terminal: customLight.background.terminal,
      header: customLight.background.header,
      tooltip: alpha('#000000', 0.85)
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      semi: 'rgba(0, 0, 0, 0.7)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      light: {
        primary: '#FFFFFF',
        semi: 'rgba(255, 255, 255, 0.9)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)'
      },
      dark: {
        primary: 'rgba(0, 0, 0, 0.87)',
        semi: 'rgba(0, 0, 0, 0.7)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)'
      }
    }
  },
  typography: getTypographyOptions
}

const primaryTheme: ThemeOptions = {
  palette: {
    mode: 'dark',
    tonalOffset: {
      light: 0.5,
      dark: 0.2
    },
    primary: {
      main: '#FFFFFF'
      // main: '#1BB16D'
    },
    secondary: {
      // main: '#FFFFFF'
      main: '#1BB16D'
      // main: '#FFFFFF'
    },
    background: {
      default: '#E02F58',
      intro: 'transparent',
      terminal: alpha('#0A0A0A', 0.5),
      header: alpha('#000000', 0.85),
      paper: '#b32546',
      tooltip: alpha('#000000', 0.85)
    },
    text: {
      primary: '#FFFFFF',
      semi: 'rgba(255, 255, 255, 0.9)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      light: {
        primary: '#FFFFFF',
        semi: 'rgba(255, 255, 255, 0.9)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)'
      },
      dark: {
        primary: 'rgba(0, 0, 0, 0.87)',
        semi: 'rgba(0, 0, 0, 0.7)',
        secondary: 'rgba(0, 0, 0, 0.54)',
        disabled: 'rgba(0, 0, 0, 0.38)'
      }
    }
  },
  typography: getTypographyOptions
}

const rootTheme: ThemeOptions = {
  ...darkTheme,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url('${backgroundImage}'), url('${loadingBackgroundImage}')`,
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
}

const themes = {
  root: responsiveFontSizes(createMuiCustomTheme(rootTheme)),
  dark: responsiveFontSizes(createMuiCustomTheme(darkTheme)),
  light: responsiveFontSizes(createMuiCustomTheme(lightTheme)),
  primary: responsiveFontSizes(createMuiCustomTheme(primaryTheme))
}

export default themes
export { themes }
export type { Theme }
