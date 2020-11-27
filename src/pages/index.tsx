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
import { GetStaticProps, NextPage } from 'next'
import Axios from 'axios'
import { deflateMediumFeed, inflateMediumFeed, parseMediumFeed, RawMediumFeed, SerializableMediumFeed } from 'types/medium-feed'
import { CalendlyMeetingDialog } from '$components/dialogs/calendly-meeting-dialog'

interface HomeProps {
  serializableMediumFeed: SerializableMediumFeed
}

const Home: NextPage<HomeProps> = (props) => {
  const mediumFeed = inflateMediumFeed(props.serializableMediumFeed)

  return (
    <>
      <Head>
        <title>Cyril CHAPON — Consultant stratégie produit &amp; CTO en freelance</title>
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
          <MediumHero
            id='mes-articles'
            mediumFeed={mediumFeed}
            escapeHeader
          />
        </ThemeProvider>

        {browserEnv.NODE_ENV === 'development' && (
          <>
            <ThemeProvider theme={themes.light}>
              <TypographyTesterHero />
            </ThemeProvider>

            <ThemeProvider theme={themes.dark}>
              <TypographyTesterHero />
            </ThemeProvider>

            <ThemeProvider theme={themes.primary}>
              <TypographyTesterHero />
            </ThemeProvider>
          </>
        )}

        <ThemeProvider theme={themes.light}>
          <MailchimpSubscribeFormDialog />
          <CalendlyMeetingDialog />
          <Snackbar />
        </ThemeProvider>
      </Main>
    </>
  )
}

const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json'
const rss2jsonRssUrlQs = 'rss_url'
const mediumFeedUrl = 'https://medium.com/feed/@cyril-chpn'

const mediumJsonFeedUrl = `${rss2jsonUrl}?${rss2jsonRssUrlQs}=${encodeURIComponent(mediumFeedUrl)}`

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const {
    data: rawMediumFeed
  } = await Axios.request<RawMediumFeed>({
    url: mediumJsonFeedUrl,
    method: 'GET'
  })

  const mediumFeed = parseMediumFeed(rawMediumFeed)
  const serializableMediumFeed = deflateMediumFeed(mediumFeed)

  return {
    props: {
      serializableMediumFeed
    }
  }
}

export default Home
