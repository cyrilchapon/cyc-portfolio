import { Hero, HeroProps } from '$components/hero'
// import { ContactPaper } from './about-me-contact-paper'
import { ImgPaper } from '$components/papers/img-paper'
import { useResponsive } from '$styles/media-query'
import { Box, Button, Container, Grid, GridSpacing, Link, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { maybePxToPx, Theme } from '$styles'
import { Breakpoint } from '@mui/system'
import { FunctionComponent, useState } from 'react'
import { themes } from '$styles'
import { SubscribeFormDialog } from '$components/dialogs/subscribe-form-dialog'
import { useGlobalState } from '$global-state'
import { mapValues, omit } from 'lodash'

const useStyles = makeStyles<Theme>(theme => ({
  hero: {
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 'auto'
  },
  imgGridItem: {
    backgroundImage: `url(${mySelfHeightImg})`,
    backgroundSize: 'cover',
    minHeight: '100vh'
  },
  paragraphGridItem: {
    maxWidth: '600px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    minHeight: '100vh'
    // [theme.breakpoints.up('lg')]: {
    //   justifySelf: 'flex-start'
    // }
  },
  bodyParagraph: {
    textAlign: 'justify',
    // '& > p:first-of-type': {
    //   marginTop: 0
    // },
    '& > p:last-of-type': {
      marginBottom: 0
    }
  }
}))

const mySelfHeightImg = 'https://images.prismic.io/cyc-portfolio/b2e8a189-5978-468f-b079-5acb0de925d6_IMG_7680_eff41a08-ea2e-4c54-972a-d918e68ad608_2000x.jpeg?auto=compress,format'
const mySelfWideImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=4:2&fit=crop&crop=faces,center'

export const HomereHero: FunctionComponent<HeroProps> = (props) => {
  const [ , setSubscribeDialogState ] = useGlobalState('subscribeDialog')

  const classes = useStyles()
  const r = useResponsive()

  return (
    <>
      <Hero bgcolor='background.default' className={classes.hero} {...props}>
        {/* <Container> */}
          <Grid
            flex={1}
            container direction='row' justifyContent='center'
            spacing={0}
            className={classes.mainGrid}
          >
            <Grid
              item xs={12} lg={6}
              container
            >
              <Box
                flex={1}
                display='flex' flexDirection='column'
                className={classes.paragraphGridItem}
              >
                <Grid
                  flex={1}
                  container direction='column' spacing={8} justifyContent='center'
                >
                  <Grid item>
                    <Typography variant='h3' component='h2'>
                      Homère
                    </Typography>

                    <Typography variant='subtitle1' gutterBottom>
                      Mon projet de coeur
                    </Typography>

                    <Typography variant='body1' component='div' className={classes.bodyParagraph}>
                      <p>
                        Depuis 2020, avec mon associé <Link href="https://www.linkedin.com/in/marc-antoine-calzada" target='_blank'>Marc-Antoine CALZADA</Link> nous avons lancé la Marketplace <strong><Link href="https://www.homere.shop" target="_blank">Homère Shop</Link></strong>.
                      </p>

                      <p>
                        Homère, c'est un site de vêtements masculins éco-responsables de qualité.
                        On déniche les plus belles marques durables de France et d'Europe,
                        et on propose leurs fringues incroyables sur notre Marketplace en ligne.
                      </p>

                      <p>
                        C'est aussi pour moi le projet parfait : un projet de coeur
                        qui résonne avec mes valeurs personnelles, tout en étant une base
                        de business solide et scalable comme je les aime.
                      </p>
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Button
                      href='https://www.homere.shop'
                      variant='contained'
                      size='large'
                    >
                      Découvrir Homère
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid
              item xs={12} lg={6}
              container spacing={0}
            >
              <Grid
                item xs={12}
                className={classes.imgGridItem}
              >
              </Grid>
            </Grid>
          </Grid>
        {/* </Container> */}
      </Hero>
    </>
  )
}
