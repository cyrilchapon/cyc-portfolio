import React from 'react'
import { linksGenerator } from '$components/html-head'
import { themes } from '$styles'
import { CssBaseline, NoSsr, ThemeProvider } from '@material-ui/core'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { SERVER_STYLESHEET_ID } from './_document'

// import { GlobalStyles, StyledNormalize, theme } from '$styles'

const App = ({ Component, pageProps }: AppProps) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector(`#${SERVER_STYLESHEET_ID}`)
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <Head>
        {linksGenerator()}
      </Head>

      <ThemeProvider theme={themes.root}>
        <CssBaseline />

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
