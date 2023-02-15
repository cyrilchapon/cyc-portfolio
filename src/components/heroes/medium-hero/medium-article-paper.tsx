import { ImgPaper } from '$components/papers/img-paper'
import { Chip, Grid, Link, PaperProps, styled, Typography, TypographyProps } from '@mui/material'
import { Interweave, ALLOWED_TAG_LIST, TransformCallback } from 'interweave'
import { DateTime } from 'luxon'
import { FunctionComponent } from 'react'
import textClip from 'text-clipper'
import { MediumArticle } from '../../../connectors/medium-feed'
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
  const formattedDateString = dateTime.toLocaleString(DateTime.DATE_FULL, { locale: 'fr-FR' })
  return formattedDateString
}

const ArticleBodyParagraph = styled('p')(() => ({
  '&:first-child': {
    marginTop: 0
  },
  '&:last-child': {
    marginBottom: 0
  }
}))

const articleBodyTransformer: TransformCallback = (node, children) => {
  if ((/^p$/i).test(node.tagName)) {
    return <ArticleBodyParagraph>{children}</ArticleBodyParagraph>
  }
}

const FitHeightImgPaper = styled(ImgPaper)(() => ({
  width: 'auto',
  maxWidth: '100%',
  height: 'auto'
}))

const ArticleDescriptionTypography = styled(Typography)<TypographyProps<'div', { component: 'div' }>>(() => ({
  textAlign: 'left',
  maxLines: 2
}))

const ArticleDateTypography = styled(Typography)<TypographyProps<'span', { component: 'span' }>>(() => ({
  '&:before': {
    content: '""'
  },
  fontStyle: 'italic'
}))

const ArticleReadmoreLink = styled(Link)(({ theme }) => ({
  fontWeight: theme.typography.variants[theme.typography.variantsMapping.body1].fontWeightBold
}))

interface MediumArticlePaperProps extends PaperProps {
  article: MediumArticle
}

const MediumArticlePaper: FunctionComponent<MediumArticlePaperProps> = (props) => {
  const {
    article,
    ...paperProps
  } = props

  return (
    <BaseMediumArticlePaper
      {...paperProps}
    >
      <Grid container spacing={4} alignItems='center'>
        <Grid item xs={12} sm={4}>
          <FitHeightImgPaper
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
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item>
            <ArticleDescriptionTypography component='div' variant='body2'>
              <Interweave
                allowList={ALLOWED_TAG_LIST.filter(tag => (
                  !['a'].includes(tag)
                ))}
                transform={articleBodyTransformer}
                content={clipContent(article.description)}
              />
              <ArticleReadmoreLink href={article.link} variant='body2'>
                &gt; Lire la suite
              </ArticleReadmoreLink>
            </ArticleDescriptionTypography>
          </Grid>

          <Grid item>
            <ArticleDateTypography variant='subtitle2' component='span'>
              {formatDate(article.pubDate)}
            </ArticleDateTypography>
          </Grid>
        </Grid>
      </Grid>
    </BaseMediumArticlePaper>
  )
}

export { MediumArticlePaper }
export type { MediumArticlePaperProps }
