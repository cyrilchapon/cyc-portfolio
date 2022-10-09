import { getPaddingTop, Hero, HeroProps } from '$components/hero'
// import { ContactPaper } from './about-me-contact-paper'
import { useResponsive } from '$styles/media-query'
import { Box, Button, Grid, Link, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Theme } from '$styles'
import { FunctionComponent } from 'react'
import { useGlobalState } from '$global-state'

const useStyles = makeStyles<Theme>(theme => ({
  hero: {
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 'auto'
  },
  imgGridContainer: {
    minHeight: '100vh',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    }
  },
  imgGridItem: {
    backgroundImage: `url(${mySelfHeightImg})`,
    backgroundSize: 'cover',
  },
  paragraphGridContainer: {
    paddingBottom: theme.spacing(4),
    ...getPaddingTop(theme)({ escapeHeader: true }),
    minHeight: '100vh',
    [theme.breakpoints.down('lg')]: {
      background: `url(${mySelfHeightImg})`,
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        display: 'block',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        zIndex: 1,
        opacity: 0.6
      }
    }
  },
  paragraphGridItem: {
    maxWidth: '600px',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    // minHeight: '100vh',
    [theme.breakpoints.down('lg')]: {
      zIndex: 2
    }
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
              className={classes.paragraphGridContainer}
            >
              <Box
                flex={1}
                display='flex' flexDirection='column'
                className={classes.paragraphGridItem}
              >
                <Grid
                  flex={1}
                  container direction='column' spacing={8}
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
                        Depuis fin 2020, avec mon associé <Link href="https://www.linkedin.com/in/marc-antoine-calzada" target='_blank'>Marc-Antoine CALZADA</Link> nous avons lancé la Marketplace <strong><Link href="https://www.homere.shop" target="_blank">Homère Shop</Link></strong>.
                        J'en suis aujourd'hui le CEO.
                      </p>

                      <p>
                        Homère, c'est un site de <strong>vêtements masculins éco-responsables de qualité</strong>.
                        On déniche les plus belles <strong>marques durables</strong> de France et d'Europe,
                        et on propose leurs fringues incroyables sur notre Marketplace en ligne.
                      </p>

                      <p>
                        C'est aussi pour moi le projet parfait : un projet de coeur
                        qui résonne avec mes <strong>valeurs personnelles</strong>, tout en étant une base
                        de business solide et scalable comme je les aime.
                      </p>
                    </Typography>
                  </Grid>

                  <Grid item container justifyContent='center'>
                    <Grid
                      item xs='auto' lg={12}
                    >
                      <Button
                        href='https://www.homere.shop'
                        variant='contained'
                        size='large'
                      >
                        Découvrir Homère
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            <Grid
              item xs={12} lg={6}
              container spacing={0}
              className={classes.imgGridContainer}
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
