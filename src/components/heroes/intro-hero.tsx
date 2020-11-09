import { Hero, HeroProps } from '$components/hero'
import { TerminalPaper } from '$components/terminal-paper'
import { Avatar, Box, Button, Container, fade, Grid, makeStyles, NoSsr, Paper, Theme, Typography } from '@material-ui/core'
import { FunctionComponent, useCallback, useState } from 'react'
import Typed from 'react-typed'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// width: theme.spacing(7),
// height: theme.spacing(7),

interface Styles {
  root: string
  avatar: string
  title: string
  subtitle: string
  subtitleStrong: string
  terminalTypo: string
}

const useStyles = makeStyles<Theme, HeroProps, keyof Styles>((theme) => ({
  root: {
  },
  avatar: {
    width: theme.spacing(32),
    height: theme.spacing(32),
  },
  title: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.variants[theme.typography.variantsMapping.h3].fontWeightRegular,
    textAlign: 'center'
  },
  subtitle: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    textTransform: 'lowercase',
    fontVariant: 'small-caps',
    fontSize: theme.typography.h4.fontSize,
    fontFamily: theme.typography.variants.sansSerif.fontFamily,
    fontWeight: theme.typography.variants.sansSerif.fontWeightLight,
    '&:before': {
      content: 'initial'
    }
  },
  subtitleStrong: {
    fontWeight: theme.typography.variants.sansSerif.fontWeightBold
  },
  terminalTypo: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.variants.mono.fontWeightMedium,
    fontFamily: theme.typography.variants.mono.fontFamily,
    fontSize: theme.typography.variants.mono.fontSize
  }
}))

const subtitleStrings = [
  '<strong>Typescript</strong> ninja^2000',
  'Voleur de <strong>briquets</strong>',
  'Amoureux des <strong>animaux</strong>',
  'Accroc aux <strong>podcasts</strong>',
  'Citoyen du <strong>monde</strong>',
  '<strong>Straight</strong> to the point',
  '<strong>Flexitarien</strong>',
  '<strong>Corsaire</strong> des temps modernes',
]

export const IntroHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles(props)

  return (
    <Hero className={classes.root} bgcolor='background.intro' {...props}>
      <Container>
        <Grid container justify='center'>
          <Grid item xs={12} sm={6} md={4}>
            <Grid container spacing={4} direction='column' alignItems='stretch'>
              <Grid item container direction='row' justify='center'>
                <Avatar
                  component={Paper}
                  elevation={2}
                  alt='Cyril CHAPON'
                  src='https://images.prismic.io/cyc-portfolio/f8c1c291-008c-45c6-96c4-7136ddd67e17_A4CC30B2-1A70-4052-98CF-07F07F17B092.jpg?auto=compress,format'
                  className={classes.avatar}
                />
              </Grid>

              <Grid item>
                <Grid container direction='column' spacing={4}>
                  <Grid item>
                    <Typography variant='h2' component='h1' className={classes.title}>
                      <strong>Cyril</strong> CHAPON
                    </Typography>

                    <Typography variant='subtitle1' component='div' className={classes.subtitle}>
                      ({' '}
                        <strong className={classes.subtitleStrong}>CTO</strong>
                        {' '}&amp;{' '}
                        <strong className={classes.subtitleStrong}>Product manager</strong>
                      {' '})
                    </Typography>
                  </Grid>

                  <Grid item>
                    <TerminalPaper initialLines={2}>
                      <Typography component='div' className={classes.terminalTypo}>
                        &gt;{' '}
                          <Typography
                            variant='srOnly'
                          >
                            {subtitleStrings[0]}
                          </Typography>

                          <Typed
                            contentType='html'
                            strings={subtitleStrings}
                            backDelay={2000}
                            backSpeed={10}
                            typeSpeed={40}
                            loop
                          />
                      </Typography>
                    </TerminalPaper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}