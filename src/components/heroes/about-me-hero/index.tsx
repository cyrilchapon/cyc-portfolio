import { Hero, HeroProps } from '$components/hero'
import { ContactPaper } from './about-me-contact-paper'
import { ImgPaper } from '$components/papers/img-paper'
import { useResponsive } from '$styles/media-query'
import { Button, Container, Grid, GridSpacing, makeStyles, Typography } from '@material-ui/core'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import { FunctionComponent } from 'react'

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles()

  const r = useResponsive()

  return (
    <Hero bgcolor='primary.main' {...props}>
      <Container>
        <Grid container direction='row' justify='center' spacing={r(breakpointGutterSpacings)}>
          <Grid
            item xs={12} lg={4}
            container direction='column' justify='center' alignItems='center'
            className={classes.imgGridItem}
          >
            <ImgPaper
              className={classes.img}
              elevation={2}
              src={r({xs: mySelfWideImg, lg: mySelfHeightImg})}
              square
            />
          </Grid>

          <Grid
            item xs={12} lg={6}
            container direction='row' spacing={4} justify='center'
          >
            <Grid item xs={12}>
              <Typography variant='h3' component='h2' className={classes.darkTypography}>
                À propos de moi
              </Typography>

              <Typography variant='subtitle1' className={classes.semiDarkTypography} gutterBottom>
                Découvrez mon profil
              </Typography>

              <Typography variant='body1' component='div' className={classes.bodyParagraph}>
                <p>
                  Évoluant depuis presque 12 ans dans le milieu de la tech
                  et majoritairement en environnement Startup,
                  j’ai exercé les besognes de Tech Lead, Chef de projet,
                  et enfin désormais <strong>CTO</strong> &amp; <strong>Product manager</strong>.
                </p>

                <p>
                  Je suis aujourd'hui freelance, et j'aime définir mon profil comme à la croisée des <strong>stratégies business</strong>, <strong>produit</strong> et <strong>technique</strong>.
                </p>
              </Typography>
            </Grid>

            <Grid item xs={12} sm={10} lg={12}>
              <ContactPaper />
            </Grid>

            <Grid
              item xs={12}
              container direction='row' justify='center'
            >
              <Button
                href='https://www.malt.fr/profile/cyrilchapon'
                variant='contained'
              >
                Me contacter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}
