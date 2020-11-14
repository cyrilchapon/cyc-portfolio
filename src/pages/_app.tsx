import { linksGenerator } from '$components/html-head'
import { themes } from '$styles'
import { CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'

// import { GlobalStyles, StyledNormalize, theme } from '$styles'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      {linksGenerator()}
    </Head>

    <NoSsr>
      <ThemeProvider theme={themes.root}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </NoSsr>
  </>
)

export default App
