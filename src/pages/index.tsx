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
import { useGlobalState } from '$global-state'
import { SubscribeFormDialog } from '$components/dialogs/subscribe-form-dialog'

const Home = () => {
  const [
    subscribeDialogOpen,
    setSubscribeDialogOpen
  ] = useGlobalState('subscribeModalOpen')

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
          <ServicesHero id='mes-services' escapeHeader />
        </ThemeProvider>

        {process.env.NODE_ENV === 'development' && (
          <ThemeProvider theme={themes.dark}>
            <TypographyTesterHero />
          </ThemeProvider>
        )}

        <ThemeProvider theme={themes.light}>
          <SubscribeFormDialog
            open={subscribeDialogOpen}
            onCancel={() => setSubscribeDialogOpen(false)}
            onSubmit={() => setSubscribeDialogOpen(false)}
          />
        </ThemeProvider>
      </Main>
    </>
  )
}

export default Home
