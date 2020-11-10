import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, GridSpacing, makeStyles, Paper, PaperProps, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints'
import clsx from 'clsx'
import { FunctionComponent } from 'react'

const useStyles = makeStyles(theme => ({
  
}))

export const ServicesHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles()

  return (
    <Hero bgcolor='secondary.main' {...props}>
      <Container>
        
      </Container>
    </Hero>
  )
}
