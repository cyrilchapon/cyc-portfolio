import * as React from 'react'
import Head from 'next/head'
import { Header } from '$components/header'
import { Main } from '$components/main'
// import { SnapBody } from '$styles'
import { IntroHero } from '$components/heroes/intro-hero'
import { AboutMeHero } from '$components/heroes/about-me-hero'
import { TypographyTesterHero } from '$components/heroes/typography-tester-hero'
import { ServicesHero } from '$components/heroes/services-hero'
import { ThemeProvider } from '@material-ui/core'
import { themes } from '$styles'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <SnapBody /> */}

      <Main>
        <Header />
        <IntroHero id='intro' escapeHeader />

        <ThemeProvider theme={themes.primary}>
          <AboutMeHero id='a-propos-de-moi' escapeHeader />
        </ThemeProvider>


        <ThemeProvider theme={themes.light}>
          <ServicesHero escapeHeader />
        </ThemeProvider>

        {process.env.NODE_ENV === 'development' && (
          <ThemeProvider theme={themes.dark}>
            <TypographyTesterHero />
          </ThemeProvider>
        )}
      </Main>
    </>
  )
}
