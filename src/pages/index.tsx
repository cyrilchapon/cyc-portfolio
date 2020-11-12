import * as React from 'react'
import Head from 'next/head'
import { Header } from '$components/header'
import { Main } from '$components/main'
// import { SnapBody } from '$styles'
import { IntroHero } from '$components/heroes/intro-hero'
import { AboutMeHero } from '$components/heroes/about-me-hero'
import { TypographyTesterHero } from '$components/heroes/typography-tester-hero'
import { ServicesHero } from '$components/heroes/services-hero'

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
        <AboutMeHero id='a-propos-de-moi' escapeHeader />
        <ServicesHero escapeHeader />

        {process.env.NODE_ENV === 'development' && <TypographyTesterHero />}
      </Main>
    </>
  )
}
