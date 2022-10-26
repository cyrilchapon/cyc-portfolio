import React, { useMemo } from 'react'
import { metasGenerator } from '$components/html-head'
import { createThemes, ThemesServiceContext } from '$styles'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
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

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const themes = useMemo(
    () => createThemes(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  )

  return (
    <>
      <Head>
        {metasGenerator()}
      </Head>

      <ThemesServiceContext.Provider value={themes}>
        <ThemeProvider theme={themes.root}>
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </ThemesServiceContext.Provider>
    </>
  )
}

export default App
