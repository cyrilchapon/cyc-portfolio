import React, { useMemo } from 'react'
import { metasGenerator } from '$components/html-head'
import { createThemes, ThemesServiceContext } from '$styles'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createEmotionCache } from '$styles/emotion-cache'
import { CacheProvider, EmotionCache } from '@emotion/react'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export type CustomAppType = typeof CustomApp

const CustomApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: CustomAppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const themes = useMemo(
    () => createThemes(prefersDarkMode ? 'dark' : 'light'),
    [prefersDarkMode],
  )

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          {metasGenerator()}
        </Head>

        <ThemesServiceContext.Provider value={themes}>
          <ThemeProvider theme={themes.root}>
            <CssBaseline />

            <Component {...pageProps} />
          </ThemeProvider>
        </ThemesServiceContext.Provider>
      </CacheProvider>
    </>
  )
}

export default CustomApp
