import { Hero, HeroProps } from '$components/hero'
import { Container, Grid, Typography } from '@material-ui/core'
import useAxios from 'axios-hooks'
import { FunctionComponent } from 'react'
import { MediumFeed } from 'types/medium-feed'

const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json'
const rss2jsonRssUrlQs = 'rss_url'
const mediumFeedUrl = 'https://Fmedium.com/feed/@cyril-chpn'

const mediumJsonFeedUrl = `${rss2jsonUrl}?${rss2jsonRssUrlQs}=${encodeURIComponent(mediumFeedUrl)}`

export const TypographyTesterHero: FunctionComponent<HeroProps> = (props) => {
  const [{
    data,
    loading,
    error
  }, refetch] = useAxios<MediumFeed>(mediumJsonFeedUrl)

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error!</p>

  return (
    <Hero bgcolor='background.default' {...props}>
      <Container>
        <Grid container direction='column'>
          <Grid item>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}
