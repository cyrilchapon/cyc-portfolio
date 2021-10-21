import { Hero, HeroProps } from '$components/hero'
import { ContactPaper } from './about-me-contact-paper'
import { ImgPaper } from '$components/papers/img-paper'
import { useResponsive } from '$styles/media-query'
import { Button, Container, Grid, GridSpacing, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import { Breakpoint } from '@mui/system/createTheme'
import { FunctionComponent, useState } from 'react'
import { themes } from '$styles'
import { SubscribeFormDialog } from '$components/dialogs/subscribe-form-dialog'
import { useGlobalState } from '$global-state'

const useStyles = makeStyles<Theme>(theme => ({
  imgGridItem: {
    [theme.breakpoints.up('lg')]: {
      alignItems: 'flex-start'
    }
  },
  img: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto'
  },
  darkTypography: {
    color: theme.palette.text.dark.semi
  },
  semiDarkTypography: {
    color: theme.palette.text.dark.secondary
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

const mySelfHeightImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=2:3&fit=crop&crop=faces,center'
const mySelfWideImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=4:2&fit=crop&crop=faces,center'

const breakpointGutterSpacings: Partial<Record<Breakpoint, GridSpacing>> = {
  xs: 4,
  md: 4,
  lg: 8
}

export const AboutMeHero: FunctionComponent<HeroProps> = (props) => {
  const [ , setSubscribeDialogState ] = useGlobalState('subscribeDialog')

  const classes = useStyles()
  const r = useResponsive()

  return (
    <>
      <Hero bgcolor='background.default' {...props}>
        <Container>
          <Grid container direction='row' justifyContent='center' spacing={r(breakpointGutterSpacings)}>
            <Grid
              item xs={12} lg={4}
              container direction='column' justifyContent='center' alignItems='center'
              className={classes.imgGridItem}
            >
              <Grid item>
                <ImgPaper
                  className={classes.img}
                  elevation={2}
                  src={r({xs: mySelfWideImg, lg: mySelfHeightImg})}
                  square
                />
              </Grid>
            </Grid>

            <Grid
              item xs={12} lg={6}
              container direction='row' spacing={4} justifyContent='center'
            >
              <Grid item xs={12}>
                <Typography variant='h3' component='h2'>
                  À propos de moi
                </Typography>

                <Typography variant='subtitle1' gutterBottom>
                  Découvrez mon profil
                </Typography>

                <Typography variant='body1' component='div' className={classes.bodyParagraph}>
                  <p>
                    Évoluant depuis presque 12 ans dans le milieu de la tech
                    et majoritairement en environnement Startup,
                    j’ai exercé les besognes de Tech Lead, Chef de projet,
                    et désormais <strong>CTO</strong> &amp; <strong>Product manager</strong>.
                  </p>

                  <p>
                    Je suis aujourd'hui freelance, et j'aime me définir comme un profil à la croisée des <strong>stratégies Business</strong>, <strong>Produit</strong> et <strong>Technique</strong>.
                  </p>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={10} lg={12}>
                <ContactPaper />
              </Grid>

              <Grid
                item xs={12}
                container direction='row' justifyContent='center'
              >
                <Grid item>
                  <Button
                    onClick={() => setSubscribeDialogState(prevState => ({
                      ...prevState,
                      open: true
                    }))}
                    component='button'
                    variant='contained'
                    size='large'
                    disableTouchRipple
                  >
                    Me contacter
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Hero>
    </>
  )
}
