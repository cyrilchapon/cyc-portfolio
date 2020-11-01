import type { AppProps } from 'next/app'

import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { globalStyles, normalize, theme } from '$styles'
import { SansSerifFontLink, MonoFontLink } from '$components/font'

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider theme={theme}>
    <SansSerifFontLink />
    <MonoFontLink />

    <Global styles={normalize} />
    <Global styles={globalStyles} />

    <Component {...pageProps} />
  </ThemeProvider>
)

export default App
