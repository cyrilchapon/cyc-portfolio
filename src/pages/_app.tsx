import { theme } from '$styles'
import { CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core'
import type { AppProps } from 'next/app'

// import { GlobalStyles, StyledNormalize, theme } from '$styles'

const App = ({ Component, pageProps }: AppProps) => (
  <NoSsr>
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Component {...pageProps} />
    </ThemeProvider>
  </NoSsr>
)

export default App
