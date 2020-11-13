import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { ServicePaper } from './service-paper'
import { services } from '$constants'

export const ServicesHero: FunctionComponent<HeroProps> = (props) => {
  return (
    <Hero bgcolor='background.default' {...props}>
      <Container>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <Typography variant='h3' component='h2'>
              Mes services
            </Typography>

            <Typography variant='subtitle1' gutterBottom>
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
                size='large'
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
