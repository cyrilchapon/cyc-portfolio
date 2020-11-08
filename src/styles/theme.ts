import { responsiveFontSizes } from '@material-ui/core'
import { createMuiTheme, ThemeOptions, Theme, fade } from '@material-ui/core/styles'
import { TypographyStyleOptions } from '@material-ui/core/styles/createTypography'
import { composeStack, FontDefinition, FONTS } from './font'

const composeMuiFontDefinition = (fontDefinition: FontDefinition) => ({
  fontFamily: composeStack(fontDefinition),
  fontWeightLight: fontDefinition.weights.light,
  fontWeightRegular: fontDefinition.weights.regular,
  fontWeightMedium: fontDefinition.weights.medium,
  fontWeightBold: fontDefinition.weights.bold,
  fontVariant: fontDefinition.variant
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

const theme: Theme = responsiveFontSizes(createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      // main: '#FF3679'
      // main: '#DB2E4E'
      main: '#E02F58'
      // main: '#E30B5D'
    },
    secondary: {
      main: '#545EF0'
    },
    background: {
      default: '#1A1A1A',
      intro: fade('#000000', 0.85),
      terminal: fade('#0A0A0A', 0.5)
    }
  },
  typography: {
    ...monoMuiFontDefinition,
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
      subtitle1: 'sansSerif',
      subtitle2: 'sansSerif',
      button: 'sansSerif',
      caption: 'mono',
      overline: 'mono'
    },
    h1: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.regular,
      // ...smallCapsStyles
    },
    h2: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.medium,
      // ...smallCapsStyles
    },
    h3: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.serif.weights.bold,
      // ...smallCapsStyles
    },
    h4: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.sansSerif.weights.bold,
      ...smallCapsStyles
    },
    h5: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.sansSerif.weights.bold,
      // ...smallCapsStyles
    },
    h6: {
      fontFamily: composeStack(FONTS.serif),
      fontWeight: FONTS.sansSerif.weights.bold,
      ...smallCapsStyles
    },
    subtitle1: {
      fontFamily: composeStack(FONTS.sansSerif),
      fontWeight: FONTS.sansSerif.weights.regular
    },
    subtitle2: {
      fontFamily: composeStack(FONTS.sansSerif),
      fontWeight: FONTS.sansSerif.weights.regular
    },
    button: {
      fontFamily: composeStack(FONTS.sansSerif),
      fontWeight: FONTS.sansSerif.weights.medium
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: 'url(https://images.prismic.io/cyc-portfolio/96cdde6f-f250-4b5b-a228-2a9f40400ede_wonderful-mountains-in-fall-colors-picjumbo-com.jpg?w=1200&auto=compress,format,enhance&q=30&fit=crop)',

          /* Background image is centered vertically and horizontally at all times */
          backgroundPosition: 'center center',

          /* Background image doesn't tile */
          backgroundRepeat: 'no-repeat',

          /* Background image is fixed in the viewport so that it doesn't move when 
             the content's height is greater than the image's height */
          backgroundAttachment: 'fixed',

          /* This is what makes the background image rescale based
             on the container's size */
          backgroundSize: 'cover',

          /* Set a background color that will be displayed
             while the background image is loading */
          backgroundColor: 'black'
        }
      }
    }
  }
}))

export default theme
export { theme }
export type { Theme }
