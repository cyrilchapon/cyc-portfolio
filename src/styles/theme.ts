import { PaletteMode, responsiveFontSizes } from '@mui/material'
import { ThemeOptions, Theme, alpha } from '@mui/material/styles'
import { Palette } from '@mui/material'
import {
  TypographyOptions,
  TypographyStyleOptions,
} from '@mui/material/styles/createTypography'
import { createMuiCustomTheme, customLight } from './custom-theme'
import { FontDefinition, FONTS } from './font'
import { createContext } from 'react'

const composeMuiFontDefinition = (fontDefinition: FontDefinition) => ({
  fontFamily: fontDefinition.style.fontFamily,
  fontWeightLight: fontDefinition.weights.light,
  fontWeightRegular: fontDefinition.weights.regular,
  fontWeightMedium: fontDefinition.weights.medium,
  fontWeightBold: fontDefinition.weights.bold,
})

const sansSerifMuiFontDefinition = composeMuiFontDefinition(FONTS.sansSerif)
const serifMuiFontDefinition = composeMuiFontDefinition(FONTS.serif)
const monoMuiFontDefinition = composeMuiFontDefinition(FONTS.mono)

// const capsStyles: TypographyStyleOptions = {
//   textTransform: "uppercase",
// };

const smallCapsStyles: TypographyStyleOptions = {
  textTransform: 'lowercase',
  fontVariant: 'all-small-caps',
}

const baseBackgroundImageId = `cyc-portfolio/d944fbaf-afb6-4b59-83bb-d137de9e24c5_ali-kazal-7b39feeIMO0-unsplash.jpg`
const baseBackgroundImage = `https://images.prismic.io/${baseBackgroundImageId}`
const loadingBackgroundImage = `${baseBackgroundImage}?w=400&auto=compress,format,enhance&q=10&fit=crop&blend-color=000000&blend-mode=normal&blend-alpha=95`
const backgroundImage = `${baseBackgroundImage}?w=1920&auto=compress,format,enhance&q=80&fit=crop&blend-color=000000&blend-mode=normal&blend-alpha=95`

const getTypographyOptions = (palette: Palette): TypographyOptions => ({
  ...sansSerifMuiFontDefinition,
  variants: {
    sansSerif: sansSerifMuiFontDefinition,
    serif: serifMuiFontDefinition,
    mono: monoMuiFontDefinition,
  },
  variantsMapping: {
    body1: 'mono',
    body2: 'mono',
    h1: 'serif',
    h2: 'serif',
    h3: 'serif',
    h4: 'serif',
    h5: 'sansSerif',
    h6: 'sansSerif',
    subtitle1: 'sansSerif',
    subtitle2: 'sansSerif',
    button: 'sansSerif',
    caption: 'mono',
    overline: 'mono',
  },
  body1: {
    color: palette.text.primary,
  },
  body2: {
    color: palette.text.primary,
  },
  h1: {
    fontFamily: FONTS.serif.style.fontFamily,
    fontWeight: FONTS.serif.weights.regular,
    color: palette.text.semi,
    // ...smallCapsStyles
  },
  h2: {
    fontFamily: FONTS.serif.style.fontFamily,
    fontWeight: FONTS.serif.weights.medium,
    color: palette.text.semi,
    // ...smallCapsStyles
  },
  h3: {
    fontFamily: FONTS.serif.style.fontFamily,
    fontWeight: FONTS.serif.weights.bold,
    color: palette.text.semi,
    // ...smallCapsStyles
  },
  h4: {
    fontFamily: FONTS.serif.style.fontFamily,
    fontWeight: FONTS.serif.weights.bold,
    color: palette.text.semi,
    // ...smallCapsStyles
  },
  h5: {
    fontFamily: FONTS.sansSerif.style.fontFamily,
    fontWeight: FONTS.sansSerif.weights.bold,
    color: palette.text.semi,
    // ...smallCapsStyles
  },
  h6: {
    fontFamily: FONTS.sansSerif.style.fontFamily,
    fontWeight: FONTS.sansSerif.weights.bold,
    color: palette.text.semi,
    ...smallCapsStyles,
  },
  subtitle1: {
    fontFamily: FONTS.sansSerif.style.fontFamily,
    fontWeight: FONTS.sansSerif.weights.medium,
    fontSize: 24,
    color: palette.text.secondary,
    letterSpacing: '2px',
    textTransform: 'lowercase',
    fontVariant: 'all-small-caps',
    '&:before': {
      content: '"— "',
    },
  },
  subtitle2: {
    fontFamily: FONTS.sansSerif.style.fontFamily,
    fontWeight: FONTS.sansSerif.weights.medium,
    fontSize: 16,
    color: palette.text.secondary,
    '&:before': {
      content: '"— "',
    },
  },
  button: {
    fontFamily: FONTS.sansSerif.style.fontFamily,
    fontWeight: FONTS.sansSerif.weights.bold,
    color: palette.text.primary,
  },
  caption: {
    color: palette.text.semi,
  },
  overline: {
    color: palette.text.semi,
  },
})

const darkThemeTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode: 'dark',
    tonalOffset: {
      light: 0.5,
      dark: 0.2,
    },
    primary: {
      main: mode === 'light' ? '#E02F58' : '#AA2443',
      // main: '#1BB16D'
    },
    secondary: {
      // main: '#FFFFFF'
      main: '#1BB16D',
      // main: '#FFFFFF'
    },
    neutral: {
      main: mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
    },
    background: {
      default: '#1A1A1A',
      intro: 'transparent',
      terminal: alpha('#0A0A0A', 0.5),
      header: alpha('#000000', 0.8),
      tooltip: alpha('#FFFFFF', 0.85),
      paper: '#0A0A0A',
    },
    text: {
      primary: mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
      semi:
        mode === 'light'
          ? 'rgba(255, 255, 255, 0.9)'
          : 'rgba(255, 255, 255, 0.8)',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      paper: {
        primary: mode === 'light' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
        semi:
          mode === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(255, 255, 255, 0.8)',
        secondary: 'rgba(255, 255, 255, 0.7)',
        disabled: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  typography: getTypographyOptions,
})

const lightThemeTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          tonalOffset: {
            light: 0.5,
            dark: 0.2,
          },
          primary: {
            main: '#E02F58',
          },
          secondary: {
            main: '#1BB16D',
          },
          neutral: {
            main: 'rgba(0, 0, 0, 0.87)',
          },
          background: {
            default: 'rgb(250, 250, 250)',
            intro: customLight.background.intro,
            terminal: customLight.background.terminal,
            header: alpha('#000000', 0.8),
            tooltip: alpha('#000000', 0.85),
          },
          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            semi: 'rgba(0, 0, 0, 0.7)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            paper: {
              primary: 'rgba(0, 0, 0, 0.87)',
              semi: 'rgba(0, 0, 0, 0.7)',
              secondary: 'rgba(0, 0, 0, 0.54)',
              disabled: 'rgba(0, 0, 0, 0.38)',
            },
          },
        }
      : darkThemeTokens('dark').palette),
  },
  typography: getTypographyOptions,
})

const primaryThemeTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          tonalOffset: {
            light: 0.5,
            dark: 0.2,
          },
          primary: {
            main: '#FFFFFF',
            // main: '#1BB16D'
          },
          secondary: {
            // main: '#FFFFFF'
            main: '#1BB16D',
            // main: '#FFFFFF'
          },
          neutral: {
            main: '#FFFFFF',
          },
          background: {
            default: '#E02F58',
            intro: 'transparent',
            terminal: alpha('#0A0A0A', 0.5),
            header: alpha('#000000', 0.8),
            paper: '#b32546',
            tooltip: alpha('#000000', 0.85),
          },
          action: {
            active: 'rgba(255, 255, 255, 0.7)',
          },
          text: {
            primary: '#FFFFFF',
            semi: 'rgba(255, 255, 255, 0.9)',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            paper: {
              primary: '#FFFFFF',
              semi: 'rgba(255, 255, 255, 0.9)',
              secondary: 'rgba(255, 255, 255, 0.7)',
              disabled: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }
      : darkThemeTokens('dark').palette),
  },
  typography: getTypographyOptions,
})

const homereThemeTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          tonalOffset: {
            light: 0.5,
            dark: 0.2,
          },
          primary: {
            main: '#FFFFFF',
            // main: '#1BB16D'
          },
          secondary: {
            // main: '#FFFFFF'
            main: '#1BB16D',
            // main: '#FFFFFF'
          },
          neutral: {
            main: '#FFFFFF',
          },
          background: {
            default: '#00483f',
            intro: 'transparent',
            terminal: alpha('#0A0A0A', 0.5),
            header: alpha('#000000', 0.8),
            paper: '#b32546',
            tooltip: alpha('#000000', 0.85),
          },
          text: {
            primary: '#FFFFFF',
            semi: 'rgba(255, 255, 255, 0.9)',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            paper: {
              primary: '#FFFFFF',
              semi: 'rgba(255, 255, 255, 0.9)',
              secondary: 'rgba(255, 255, 255, 0.7)',
              disabled: 'rgba(255, 255, 255, 0.5)',
            },
          },
        }
      : darkThemeTokens('dark').palette),
  },
  typography: getTypographyOptions,
})

const rootThemeTokens = (mode: PaletteMode): ThemeOptions => ({
  ...darkThemeTokens(mode),
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: `url('${backgroundImage}'), url('${loadingBackgroundImage}')`,
          // Fallback
          backgroundColor: 'black',

          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          // Don't scroll
          backgroundAttachment: 'fixed',
          // Fill
          backgroundSize: 'cover',

          // Fix for Safari not supporting fixed
          '@supports (-webkit-overflow-scrolling: touch)': {
            backgroundAttachment: 'scroll',
            backgroundPosition: 'top center',
            backgroundSize: 'contain',
          },
        },
      },
    },
  },
})

const createThemes = (mode: PaletteMode) => ({
  root: responsiveFontSizes(createMuiCustomTheme(rootThemeTokens(mode))),
  dark: responsiveFontSizes(createMuiCustomTheme(darkThemeTokens(mode))),
  light: responsiveFontSizes(createMuiCustomTheme(lightThemeTokens(mode))),
  primary: responsiveFontSizes(createMuiCustomTheme(primaryThemeTokens(mode))),
  homere: responsiveFontSizes(createMuiCustomTheme(homereThemeTokens(mode))),
})

type Themes = {
  root: Theme
  dark: Theme
  light: Theme
  primary: Theme
  homere: Theme
}

const ThemesServiceContext = createContext<Themes>(createThemes('light'))

export default createThemes
export { createThemes, ThemesServiceContext }
export type { Theme, Themes }
