import React, { useMemo } from 'react'
import { metasGenerator } from '$components/html-head'
import { createThemes, ThemesServiceContext } from '$styles'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { createEmotionCache } from '$styles/emotion-cache'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { browserEnv } from '../env/index'

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
      <GoogleReCaptchaProvider reCaptchaKey={browserEnv.NEXT_PUBLIC_RECAPTCHA_V3_PUBLIC_KEY}>
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
      </GoogleReCaptchaProvider>
    </>
  )
}

export default CustomApp
