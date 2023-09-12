import { Hero, HeroProps } from '$components/hero'
import { urls } from '$constants'
import { Button, Container, Grid, Typography, buttonClasses } from '@mui/material'
import { forwardRef, ForwardRefExoticComponent } from 'react'
import { MediumFeed } from '../../../connectors/medium-feed'
import { FakeArticlePaper } from './fake-article-paper'
import { MediumArticlePaper } from './medium-article-paper'
import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { faMedium } from '@fortawesome/free-brands-svg-icons'


interface MediumHeroProps extends HeroProps {
  mediumFeed?: MediumFeed
  articlesCount?: number
}

export const MediumHero: ForwardRefExoticComponent<MediumHeroProps> = forwardRef((props, ref) => {
  const {
    articlesCount: _articlesCount,
    mediumFeed,
    ...heroProps
  } = props

  const articlesCount = _articlesCount ?? 2

  return (
    <Hero bgcolor='background.default' ref={ref} {...heroProps}>
      <Container>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <Typography variant='h3' component='h2'>
              Articles
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
            container justifyContent='center'
          >
            <Grid item>
              <Button
                href={urls.medium}
                variant='outlined'
                size='large'
                sx={{
                  [`& .${buttonClasses.startIcon} > *:nth-of-type(1)`]: {
                    fontSize: '1.2em',
                  },
                }}
                startIcon={ <FontAwesomeSvgIcon icon={faMedium} fontSize='small' /> }
              >
                En lire d&apos;autres
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
})
