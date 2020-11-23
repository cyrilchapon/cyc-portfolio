import { ImgPaper } from '$components/papers/img-paper'
import { Chip, Grid, Link, makeStyles, PaperProps, Typography } from '@material-ui/core'
import Interweave, { ALLOWED_TAG_LIST, TransformCallback } from 'interweave'
import { DateTime } from 'luxon'
import { FunctionComponent } from 'react'
import textClip from 'text-clipper'
import { MediumArticle } from 'types/medium-feed'
import { BaseMediumArticlePaper } from './base-medium-article-paper'

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
  if ((/^p$/i).test(node.tagName)) {
    return <p className={classes.articleBodyParagraph}>{children}</p>
  }
}
const useStyles = makeStyles(theme => ({
  img: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto'
  },
  articleDescriptionTypography: {
    textAlign: 'left',
    maxLines: 2
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

interface MediumArticlePaperProps extends PaperProps {
  article: MediumArticle
}

const MediumArticlePaper: FunctionComponent<MediumArticlePaperProps> = (props) => {
  const {
    article,
    ...paperProps
  } = props

  const classes = useStyles()

  return (
    <BaseMediumArticlePaper
      {...paperProps}
    >
      <Grid container spacing={4} alignItems='center'>
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
    </BaseMediumArticlePaper>
  )
}

export { MediumArticlePaper }
export type { MediumArticlePaperProps }
