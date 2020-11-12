import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { ServicePaper } from './service-paper'
import { services } from '$constants'

const useStyles = makeStyles(theme => ({
  serviceTitle: {
    color: theme.palette.primary.main
  },
  serviceSubtitle: {
    color: theme.palette.text.dark.secondary
  }
}))

export const ServicesHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles()

  return (
    <Hero bgcolor='background.light.default' {...props}>
      <Container>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <Typography variant='h3' component='h2' className={classes.serviceTitle}>
              Mes services
            </Typography>

            <Typography variant='subtitle1' className={classes.serviceSubtitle} gutterBottom>
              Ce que je sais faire
            </Typography>
          </Grid>

          <Grid
            item
            container direction='row' justify='center' spacing={4}
          >
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index}>
                <ServicePaper
                  title={service.title}
                  icon={service.icon}
                  features={service.features}
                />
              </Grid>
            ))}
          </Grid>

          <Grid
            item xs={12}
            container justify='center'
          >
            <Grid item>
              <Button
                href='https://www.malt.fr/profile/cyrilchapon'
                variant='contained'
                color='primary'
              >
                M'engager
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}
