import _Document, {
  Html,
  Head,
  Main,
  NextScript,
  // DocumentContext,
  DocumentInitialProps
} from 'next/document'

import {
  SansSerifFontLink,
  SerifFontLink,
  MonoFontLink,
  ViewportMetaLink
} from '$components/html-head'

class Document extends _Document<DocumentInitialProps> {
  render() {
    return (
      <Html>
        <Head>
          <ViewportMetaLink />
          <SansSerifFontLink />
          <SerifFontLink />
          <MonoFontLink />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document