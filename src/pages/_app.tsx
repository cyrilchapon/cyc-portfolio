import type { AppProps } from 'next/app'

import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { globalStyles, normalize, theme } from '$styles'

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <ThemeProvider theme={theme}>
      <Global styles={normalize} />
      <Global styles={globalStyles} />

      <Component {...pageProps} />
    </ThemeProvider>
  </>
)

export default App
