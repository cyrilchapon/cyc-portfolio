import * as React from 'react'
import Head from 'next/head'
import { Header } from '$components/header'
import { Main } from '$components/main'
import { IntroHero } from '$components/heroes/intro-hero'
import { AboutMeHero } from '$components/heroes/about-me-hero'
import { TypographyTesterHero } from '$components/heroes/typography-tester-hero'
import { GridTesterHero } from '$components/heroes/grid-tester-hero'
import { ServicesHero } from '$components/heroes/services-hero'
import { MediumHero } from '$components/heroes/medium-hero'
import { HomereHero } from '$components/heroes/homere-hero'
import { styled, ThemeProvider } from '@mui/material'
import { ApiSubscribeFormDialog } from '$components/dialogs/api-subscribe-form-dialog'
import { browserEnv } from '$env'
import { ConnectedSnackbar as Snackbar } from '$components/snackbar'
import { GetStaticProps, NextPage } from 'next'
import Axios from 'axios'
import {
  deflateMediumFeed,
  inflateMediumFeed,
  parseMediumFeed,
  RawMediumFeed,
  SerializableMediumFeed,
} from '../connectors/medium-feed'
import { CalComMeetingDialog } from '$components/dialogs/calcom-meeting-dialog'
import { Themes, ThemesServiceContext } from '$styles'
import { MainFab, MainFabProps } from '$components/fab'
import { IntersectionOptions, useLastInView } from '../hooks/use-last-in-view'
import { ResumeHero } from '$components/heroes/resume-hero'
import { urls } from '$constants'

interface HomeProps {
  serializableMediumFeed: SerializableMediumFeed
}

export type HeroType = 'intro' | 'about' | 'resume' | 'homere' | 'services' | 'medium'
export const heroThemes: Record<HeroType, keyof Themes> = {
  intro: 'root',
  about: 'primary',
  resume: 'dark',
  homere: 'homere',
  services: 'light',
  medium: 'dark',
}

const PositionedMainFab = styled(MainFab)<MainFabProps>(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(4),
  right: theme.spacing(4),
  [theme.breakpoints.up('lg')]: {
    bottom: theme.spacing(8),
    right: theme.spacing(8),
  }
}))

const inViewObserverOptions: IntersectionOptions = {
  threshold: 0,
  rootMargin: '-20% 0% -20% 0%',
}

const Home: NextPage<HomeProps> = (props) => {
  const themes = React.useContext(ThemesServiceContext)

  const mediumFeed = inflateMediumFeed(props.serializableMediumFeed)

  const [
    heroInView,
    {
      intro: [introRef],
      about: [aboutRef],
      services: [servicesRef],
      resume: [resumeRef],
      homere: [homereRef],
      medium: [mediumRef],
    },
  ] = useLastInView<HeroType>({
    intro: inViewObserverOptions,
    about: inViewObserverOptions,
    services: inViewObserverOptions,
    resume: inViewObserverOptions,
    homere: inViewObserverOptions,
    medium: inViewObserverOptions,
  })

  const themeKeyInView: keyof Themes =
    heroInView != null ? heroThemes[heroInView] : 'root'

  return (
    <>
      <Head>
        <title>
          Cyril CHAPON — Consultant stratégie produit &amp; CTO en freelance
        </title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header />

      <Main>
        <ThemeProvider theme={themes[heroThemes.intro]}>
          <IntroHero ref={introRef} id="intro" escapeHeader />
        </ThemeProvider>

        <ThemeProvider theme={themes[heroThemes.about]}>
          <AboutMeHero ref={aboutRef} id="a-propos-de-moi" escapeHeader />
        </ThemeProvider>

        <ThemeProvider theme={themes[heroThemes.services]}>
          <ServicesHero ref={servicesRef} id="mes-services" escapeHeader />
        </ThemeProvider>

        <ThemeProvider theme={themes[heroThemes.resume]}>
          <ResumeHero ref={resumeRef} id="mon-parcours" escapeHeader />
        </ThemeProvider>

        <ThemeProvider theme={themes[heroThemes.homere]}>
          <HomereHero ref={homereRef} id="homere" />
        </ThemeProvider>

        <ThemeProvider theme={themes[heroThemes.medium]}>
          <MediumHero
            ref={mediumRef}
            id="mes-articles"
            mediumFeed={mediumFeed}
            escapeHeader
          />
        </ThemeProvider>

        {browserEnv.NODE_ENV === 'development' && (
          <>
            <ThemeProvider theme={themes.light}>
              <GridTesterHero />
            </ThemeProvider>

            <ThemeProvider theme={themes.light}>
              <TypographyTesterHero />
            </ThemeProvider>

            <ThemeProvider theme={themes.dark}>
              <TypographyTesterHero />
            </ThemeProvider>

            <ThemeProvider theme={themes.primary}>
              <TypographyTesterHero />
            </ThemeProvider>

            <ThemeProvider theme={themes.homere}>
              <TypographyTesterHero />
            </ThemeProvider>
          </>
        )}

        <ThemeProvider theme={themes.light}>
          <ApiSubscribeFormDialog />
          <CalComMeetingDialog />
          <Snackbar />
        </ThemeProvider>

        <ThemeProvider theme={themes.root}>
          <PositionedMainFab
            currentHeroInView={heroInView}
            currentThemeKey={themeKeyInView}
          />
        </ThemeProvider>
      </Main>
    </>
  )
}

const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json'
const rss2jsonRssUrlQs = 'rss_url'
const mediumFeedUrl = urls.mediumFeed

const mediumJsonFeedUrl = `${rss2jsonUrl}?${rss2jsonRssUrlQs}=${encodeURIComponent(
  mediumFeedUrl,
)}`

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data: rawMediumFeed } = await Axios.request<RawMediumFeed>({
    url: mediumJsonFeedUrl,
    method: 'GET',
  })

  const mediumFeed = parseMediumFeed(rawMediumFeed)
  const serializableMediumFeed = deflateMediumFeed(mediumFeed)

  return {
    props: {
      serializableMediumFeed,
    },
  }
}

export default Home
