import { Hero, HeroProps } from '$components/hero'
import { terminalStrings } from '$constants'
import { Container, Grid } from '@mui/material'
import { FunctionComponent } from 'react'
import { IntroAvatar } from './intro-avatar'
import { IntroSubtitle } from './intro-subtitle'
import { TerminalPaper } from './intro-terminal-paper'
import { IntroTitle } from './intro-title'

export const IntroHero: FunctionComponent<HeroProps> = (props) => {
  return (
    <Hero bgcolor='background.intro' {...props}>
      <Container>
        <Grid container justifyContent='center'>
          <Grid
            item xs={12} sm={8} lg={6}
            container spacing={4} direction='column' alignItems='stretch'
          >
            <Grid
              item
              container direction='row' justifyContent='center'
            >
              <Grid item>
                <IntroAvatar />
              </Grid>
            </Grid>

            <Grid
              item
              container direction='row' justifyContent='center' spacing={4}
            >
              <Grid item xs={12}>
                <IntroTitle />
                <IntroSubtitle />
              </Grid>

              <Grid item xs={12} sm={10}>
                <TerminalPaper strings={terminalStrings} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}