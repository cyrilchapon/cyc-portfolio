// Polyfill document for interweave
import { polyfill as interweavePolyfill } from 'interweave-ssr'
interweavePolyfill()

import React from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'
import { linksGenerator } from '$components/html-head'
import { createEmotionCache } from '$styles/emotion-cache'
import createEmotionServer from '@emotion/server/create-instance'
import { CustomAppType } from './_app'
import { AppType, Enhancer } from 'next/dist/shared/lib/utils'

type CustomDocumentProps = {
  emotionStyleTags: JSX.Element[]
}

class CustomDocument extends Document<CustomDocumentProps> {
  static async getInitialProps (ctx: DocumentContext) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    const originalRenderPage = ctx.renderPage
    const cache = createEmotionCache()
    const { extractCriticalToChunks } = createEmotionServer(cache)
  
    const appEnhancer: Enhancer<CustomAppType> = (CustomApp) => function EnhancedApp(props) {
      return <CustomApp emotionCache={cache} {...props} />
    }

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: appEnhancer as Enhancer<AppType>
      })
  
    const initialProps = await Document.getInitialProps(ctx)
    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ))
  
    return {
      ...initialProps,
      emotionStyleTags,
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.emotionStyleTags}
          {linksGenerator()}
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument
