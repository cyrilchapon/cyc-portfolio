import _Document, {
  Html,
  Head,
  Main,
  NextScript,
  // DocumentContext,
  DocumentInitialProps
} from 'next/document'

class Document extends _Document<DocumentInitialProps> {
  render() {
    return (
      <Html>
        <Head />

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document