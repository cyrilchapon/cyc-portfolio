import * as React from 'react'
import Head from 'next/head'
// import { Button, Hamburger, Spacing } from '@sumup/circuit-ui'
import { Hero } from '$components/hero'
import { Header } from '$components/header'
import { Main } from '$components/main'
// import { Container } from '$components/container'
// import { SnapBody } from '$styles'
import { IntroHero } from '$components/heroes/intro-hero'
import { AboutMeHero } from '$components/heroes/about-me-hero'
import { TypographyTesterHero } from '$components/heroes/typography-tester-hero'

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

        {/* <TypographyTesterHero /> */}
      </Main>
    </>
  )
}
