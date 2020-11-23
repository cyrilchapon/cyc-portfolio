import * as React from 'react'
import Head from 'next/head'
import { Header } from '$components/header'
import { Main } from '$components/main'
// import { SnapBody } from '$styles'
import { IntroHero } from '$components/heroes/intro-hero'
import { AboutMeHero } from '$components/heroes/about-me-hero'
import { TypographyTesterHero } from '$components/heroes/typography-tester-hero'
import { ServicesHero } from '$components/heroes/services-hero'
import { MediumHero } from '$components/heroes/medium-hero'
import { ThemeProvider } from '@material-ui/core'
import { themes } from '$styles'
import { MailchimpSubscribeFormDialog } from '$components/dialogs/mailchimp-subscribe-form-dialog'
import { browserEnv } from '$env'
import { ConnectedSnackbar as Snackbar } from '$components/snackbar'

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <SnapBody /> */}

      <Header />

      <Main>
        <IntroHero id='intro' escapeHeader />

        <ThemeProvider theme={themes.primary}>
          <AboutMeHero id='a-propos-de-moi' escapeHeader />
        </ThemeProvider>

        <ThemeProvider theme={themes.light}>
          <ServicesHero id='mes-services' escapeHeader />
        </ThemeProvider>

        <ThemeProvider theme={themes.dark}>
          <MediumHero id='mes-articles' escapeHeader />
        </ThemeProvider>

        {browserEnv.NODE_ENV === 'development' && (
          <ThemeProvider theme={themes.light}>
            <TypographyTesterHero />
          </ThemeProvider>
        )}

        <ThemeProvider theme={themes.light}>
          <MailchimpSubscribeFormDialog />
          <Snackbar />
        </ThemeProvider>
      </Main>
    </>
  )
}

export default Home
