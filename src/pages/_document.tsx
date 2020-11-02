import _Document, {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

import {
  SansSerifFontLink,
  MonoFontLink
} from '$components/font'

class Document extends _Document {
  render() {
    return (
      <Html>
        <Head>
          <SansSerifFontLink />
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