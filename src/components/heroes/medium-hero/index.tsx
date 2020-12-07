import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { MediumFeed } from 'types/medium-feed'
import { FakeArticlePaper } from './fake-article-paper'
import { MediumArticlePaper } from './medium-article-paper'


interface MediumHeroProps extends HeroProps {
  mediumFeed?: MediumFeed
  articlesCount?: number
}

export const MediumHero: FunctionComponent<MediumHeroProps> = (props) => {
  const {
    articlesCount: _articlesCount,
    mediumFeed,
    ...heroProps
  } = props

  const articlesCount = _articlesCount ?? 2

  return (
    <Hero bgcolor='background.default' {...heroProps}>
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

          <Grid item>
            <Grid
              container direction='column' spacing={3}
            >
            {mediumFeed != null
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
            </Grid>
          </Grid>

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
      </Container>
    </Hero>
  )
}
