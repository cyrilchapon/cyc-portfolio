import { Hero, HeroProps } from '$components/hero'
import { FontAwesomeSvgIcon } from '$components/icons/font-awesome-svg-icon'
import { ContactPaper } from '$components/papers/contact-paper'
import { useMediaQueryMatches, useMediaQueryValue } from '$styles/media-query'
import { faMailchimp } from '@fortawesome/free-brands-svg-icons'
import { faBlenderPhone, faEnvelope, faPhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { Button, Card, CardMedia, Container, Grid, GridSpacing, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, PaperProps, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import clsx from 'clsx'
import { FunctionComponent } from 'react'
import { DarkButton } from '../dark-button'

const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    height: '100%'
  },
  imgGridItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      alignItems: 'flex-start'
    }
  },
  img: {
    width: 'auto',
    maxWidth: '100%',
    height: 'auto'
  },
  titleGroup: {
    paddingBottom: '0!important'
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
  },
  lightButton: {
    // backgroundColor: theme.palette.primary.main
  }
}))

const mySelfHeightImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=2:3&fit=crop&crop=faces,center'
const mySelfWideImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=4:2&fit=crop&crop=faces,center'

const breakpointGutterSpacings: Partial<Record<Breakpoint, GridSpacing>> = {
  xs: 4,
  md: 4,
  lg: 8
}

const ImgPaper: FunctionComponent<PaperProps & { src: string }> = (props) => (
  <Paper {...props} />
)

export const AboutMeHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles()

  const [ mqSpacing ] = useMediaQueryValue(breakpointGutterSpacings)!
  const mqMatches = useMediaQueryMatches()

  return (
    <Hero bgcolor='primary.main' {...props}>
      <Container>
        <Grid container direction='row' justify='center' spacing={mqSpacing}>
          <Grid item xs={12} lg={4} className={classes.imgGridItem}>
            <ImgPaper
              className={clsx(classes.paper, classes.img)}
              elevation={2}
              component='img'
              src={mqMatches.lg ? mySelfHeightImg : mySelfWideImg}
              square
            />
          </Grid>

          <Grid item xs={12} lg={6} container direction='row' spacing={4} justify='center'>
            <Grid item xs={12}>
              <Typography variant='h3' component='h2' className={classes.darkTypography}>
                À propos de moi
              </Typography>

              <Typography variant='subtitle1' className={classes.semiDarkTypography} gutterBottom>
                Découvrez mon profil
              </Typography>

              <Typography variant='body1' className={classes.bodyParagraph}>
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

            <Grid item xs={12} container direction='row' justify='center'>
              <Button
                href='https://www.malt.fr/profile/cyrilchapon'
                variant='contained'
                className={classes.lightButton}
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
