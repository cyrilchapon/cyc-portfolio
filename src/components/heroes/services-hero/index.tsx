import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, makeStyles, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { ServicePaper } from './service-paper'
import { services } from '$constants'
import { useGlobalState } from '$global-state'

const useStyles = makeStyles(theme => ({
  buttonGridItem: {
    textAlign: 'center'
  }
}))

export const ServicesHero: FunctionComponent<HeroProps> = (props) => {
  const classes = useStyles()

  const [ , setMeetingDialogState ] = useGlobalState('meetingDialog')

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

          <Grid item>
            <Grid container direction='row' justifyContent='center' spacing={4}>
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
          </Grid>

          <Grid item xs={12}>
            <Grid container direction='row' justifyContent='center' spacing={2}>
              <Grid item xs={12} sm='auto' className={classes.buttonGridItem}>
                <Button
                  onClick={() => setMeetingDialogState(prevState => ({
                    ...prevState,
                    open: true
                  }))}
                  variant='outlined'
                  color='primary'
                  size='large'
                  disableTouchRipple
                >
                  Prendre rendez-vous
                </Button>
              </Grid>

              <Grid item xs={12} sm='auto' className={classes.buttonGridItem}>
                <Button
                  href='https://www.malt.fr/project/new?freelanceId=5f7cfd793a399f2641be0ce0&amp;viewId=5fbfd99ec994b74bc573bb54'
                  variant='contained'
                  color='primary'
                  size='large'
                >
                  Devis gratuit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}
