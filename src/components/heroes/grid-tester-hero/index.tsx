import { Hero, HeroProps } from '$components/hero'
import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import { FunctionComponent } from 'react'
import { themes } from '$styles'
import clsx from 'clsx'

const useStyles = makeStyles<Theme>(theme => ({
  hero: {
    backgroundColor: theme.palette.background.default,
    borderTop: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  col: {
    minHeight: '500px'
  },
  leftCol: {
    backgroundColor: theme.palette.primary.main
  },
  rightCol: {
    backgroundColor: theme.palette.secondary.main
  },
  cell: {
    minHeight: '100px'
  },
  leftCell: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundImage: 'linear-gradient(45deg, rgba(0, 0, 0, 0.3) 25%, transparent 25%), linear-gradient(-45deg, rgba(0, 0, 0, 0.3) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.3) 75%), linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.3) 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  },
  rightCell: {
    backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.3) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.3) 75%)',
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
  }
}))

const mySelfHeightImg = 'https://images.prismic.io/cyc-portfolio/b2e8a189-5978-468f-b079-5acb0de925d6_IMG_7680_eff41a08-ea2e-4c54-972a-d918e68ad608_2000x.jpeg?auto=compress,format'
const mySelfWideImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=4:2&fit=crop&crop=faces,center'

export const GridTesterHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles()

  return (
    <Hero {...props} className={classes.hero}>
      <Grid
        container direction='row' justifyContent='center'
        spacing={0}
      >
        <Grid
          item xs={12} lg={6}
          container direction='row' spacing={0} justifyContent='center'
          className={clsx(classes.col, classes.leftCol)}
        >
          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.leftCell)}
          >
          </Grid>

          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.rightCell)}
          >
          </Grid>
        </Grid>

        <Grid
          item xs={12} lg={6}
          container direction='row' spacing={0} justifyContent='center'
          className={clsx(classes.col, classes.rightCol)}
        >
          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.leftCell)}
          >
            some content
          </Grid>

          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.rightCell)}
          >
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container direction='row' justifyContent='center'
        spacing={6}
      >
        <Grid
          item xs={12} lg={6}
          container direction='row' spacing={2} justifyContent='center'
          className={clsx(classes.col, classes.leftCol)}
        >
          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.leftCell)}
          >
          </Grid>

          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.rightCell)}
          >
          </Grid>
        </Grid>

        <Grid
          item xs={12} lg={6}
          container direction='row' spacing={4} justifyContent='center'
          className={clsx(classes.col, classes.rightCol)}
        >
          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.leftCell)}
          >
            some content
          </Grid>

          <Grid
            item xs={12} lg={6}
            className={clsx(classes.cell, classes.rightCell)}
          >
          </Grid>
        </Grid>
      </Grid>
    </Hero>
  )
}
