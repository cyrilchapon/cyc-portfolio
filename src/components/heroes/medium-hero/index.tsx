import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import useAxios from 'axios-hooks'
import { FunctionComponent, useMemo } from 'react'
import { MediumFeed, parseMediumFeed, RawMediumFeed } from 'types/medium-feed'
import { FakeArticlePaper } from './fake-article-paper'
import { MediumArticlePaper } from './medium-article-paper'

const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json'
const rss2jsonRssUrlQs = 'rss_url'
const mediumFeedUrl = 'https://medium.com/feed/@cyril-chpn'

const mediumJsonFeedUrl = `${rss2jsonUrl}?${rss2jsonRssUrlQs}=${encodeURIComponent(mediumFeedUrl)}`

interface MediumHeroProps extends HeroProps {
  articlesCount?: number
}

export const MediumHero: FunctionComponent<MediumHeroProps> = (props) => {
  const {
    articlesCount: _articlesCount,
    ...heroProps
  } = props

  const articlesCount = _articlesCount ?? 2

  const [{
    data: rawMediumFeed,
    loading,
    error
  }, refetch] = useAxios<RawMediumFeed>({
    url: mediumJsonFeedUrl
  }, {
    useCache: false
  })

  const mediumFeed = useMemo<MediumFeed | null>(
    () => (
      rawMediumFeed != null
        ? parseMediumFeed(rawMediumFeed)
        : null
    ),
    [rawMediumFeed]
  )

  return (
    <Hero bgcolor='background.default' {...props}>
      <Container>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <Typography variant='h3' component='h2'>
              Mes articles
            </Typography>

            <Typography variant='subtitle1' gutterBottom>
              Un peu de lecture
            </Typography>
          </Grid>

          <Grid
            item
            container direction='column' spacing={3}
          >
          {!loading && mediumFeed != null
            ? (
              <>
              {mediumFeed.articles.slice(0, articlesCount).map(article => (
                <Grid item key={article.guid}>
                  <MediumArticlePaper article={article} />
                </Grid>
              ))}
              </>
            )
            : (
              <>
              {Array(articlesCount).fill(undefined).map((v, index) => (
                <Grid item key={index}>
                  <FakeArticlePaper />
                </Grid>
              ))}
              </>
            )
          }

          <Grid
            item xs={12}
            container justify='center'
          >
            <Grid item>
              <Button
                href='https://cyril-chpn.medium.com'
                variant='outlined'
                color='default'
                size='large'
              >
                Découvrir
              </Button>
            </Grid>
          </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}
