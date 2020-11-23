import { Hero, HeroProps } from '$components/hero'
import { Button, Chip, Container, Grid, Link, makeStyles, Paper, Typography } from '@material-ui/core'
import useAxios from 'axios-hooks'
import { FunctionComponent, useMemo } from 'react'
import { MediumFeed, parseMediumFeed, RawMediumFeed } from 'types/medium-feed'
import Interweave, { ALLOWED_TAG_LIST, TransformCallback } from 'interweave'
import { ImgPaper } from '$components/papers/img-paper'
import textClip from 'text-clipper'
import { DateTime } from 'luxon'

const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json'
const rss2jsonRssUrlQs = 'rss_url'
const mediumFeedUrl = 'https://medium.com/feed/@cyril-chpn'

const mediumJsonFeedUrl = `${rss2jsonUrl}?${rss2jsonRssUrlQs}=${encodeURIComponent(mediumFeedUrl)}`

const useStyles = makeStyles(theme => ({
  img: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto'
  },
  articlePaper: {
    padding: theme.spacing(2)
  },
  articleDescriptionTypography: {
    textAlign: 'left'
  },
  articleBodyParagraph: {
    '&:first-child': {
      marginTop: 0
    },
    '&:last-child': {
      marginBottom: 0
    }
  },
  articleDate: {
    '&:before': {
      content: '""'
    },
    fontStyle: 'italic'
  },
  articleReadmore: {
    fontWeight: theme.typography.variants[theme.typography.variantsMapping.body1].fontWeightBold
  }
}))

const clipContent = (content: string) => {
  const clippedContent = textClip(content, 330, {
    html: true,
    breakWords: false,
    imageWeight: 0
  })
  return clippedContent
}

const formatDate = (date: Date) => {
  const dateTime = DateTime.fromJSDate(date)
  const formattedDateString = dateTime.toLocaleString(DateTime.DATE_FULL)
  return formattedDateString
}

const articleBodyTransformer = (classes: ReturnType<typeof useStyles>): TransformCallback => (node, children) => {
  console.log(node.tagName)
  if ((/^p$/i).test(node.tagName)) {
    return <p className={classes.articleBodyParagraph}>{children}</p>
  }
}

export const MediumHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles()

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
    () => (rawMediumFeed != null
      ? parseMediumFeed(rawMediumFeed)
      : null
    ),
    [rawMediumFeed]
  )

  console.log(mediumFeed)

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
          {mediumFeed != null
            ? (
              <>
              {mediumFeed.articles.map(article => (
                <Grid item key={article.guid}>
                  <Paper className={classes.articlePaper}>
                    <Grid container spacing={2} alignItems='center'>
                      <Grid item xs={12} sm={4}>
                        <ImgPaper
                          className={classes.img}
                          // elevation={2}
                          src={article.thumbnail}
                          variant='outlined'
                          // square
                        />
                      </Grid>

                      <Grid
                        item xs={12} sm={8} lg={7} xl={6}
                        container direction='column' spacing={2}
                      >
                        <Grid item>
                          <Typography variant='h4' component='h3'>
                            <Interweave content={article.title} />
                          </Typography>

                          {article.subtitle && (
                            <Typography variant='subtitle1' component='span'>
                              <Interweave content={article.subtitle} />
                            </Typography>
                          )}

                          <Grid container spacing={1}>
                            {article.categories.map(category => (
                              <Grid item key={category}>
                                <Chip
                                  label={category}
                                  size='small'
                                  // color='primary'
                                  variant='default'
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Typography component='div' variant='body2' className={classes.articleDescriptionTypography}>
                            <Interweave
                              allowList={ALLOWED_TAG_LIST.filter(tag => (
                                !['a'].includes(tag)
                              ))}
                              transform={articleBodyTransformer(classes)}
                              content={clipContent(article.description)}
                            />
                            <Link href={article.link} variant='body2' className={classes.articleReadmore}>
                              &gt; Lire la suite
                            </Link>
                          </Typography>
                        </Grid>

                        <Grid item>
                          <Typography variant='subtitle2' component='span' className={classes.articleDate}>
                            {formatDate(article.pubDate)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
              </>
            )
            : <span>Loading</span>
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
