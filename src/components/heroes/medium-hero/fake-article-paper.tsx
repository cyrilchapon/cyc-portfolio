import { AspectRatioSkeleton } from '$components/aspect-ratio-squeleton'
import { Grid, makeStyles, Paper, PaperProps } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { FunctionComponent } from 'react'
import { BaseMediumArticlePaper } from './base-medium-article-paper'

const useStyles = makeStyles(theme => ({

}))

const FakeArticlePaper: FunctionComponent<PaperProps> = (props) => {
  const classes = useStyles()

  return (
    <BaseMediumArticlePaper
      {...props}
    >
      <Grid container spacing={4} alignItems='center'>
        <Grid item xs={12} sm={4}>
          <Paper>
            <div style={{ position: 'relative' }}>
              <AspectRatioSkeleton width='100%' ratio={2/3} />
            </div>
          </Paper>
        </Grid>

        <Grid
          item xs={12} sm={8} lg={7} xl={6}
          container direction='column' spacing={2}
        >
          <Grid item>
            <Skeleton variant='text' width={`${2*100/3}%`} />
            <Skeleton variant='text' width={`${1*100/2}%`} />

            {/* <Grid container spacing={1}>
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
            </Grid> */}
          </Grid>

          <Grid item>
            <Skeleton variant='rect' width='100%' height={200} />
          </Grid>

          <Grid item>
            <Skeleton variant='text' width={150} />
          </Grid>
        </Grid>
      </Grid>
    </BaseMediumArticlePaper>
  )
}

export { FakeArticlePaper }
