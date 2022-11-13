import { Hero, HeroProps } from '$components/hero'
import { Button, Container, Grid, styled, Typography } from '@mui/material'
import { forwardRef, ForwardRefExoticComponent } from 'react'
import { ServicePaper } from './service-paper'
import { services, urls } from '$constants'
import { useGlobalState } from '$global-state'
import { useCalApi } from 'contextes/cal'

const ButtonGridItem = styled(Grid)(() => ({
  textAlign: 'center',
}))

export const ServicesHero: ForwardRefExoticComponent<HeroProps> = forwardRef(
  (props, ref) => {
    const [, setMeetingDialogState] = useGlobalState('meetingDialog')

    const calApi = useCalApi()

    return (
      <Hero bgcolor="background.default" ref={ref} {...props}>
        <Container>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h3" component="h2">
                Services
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Ce que je sais faire
              </Typography>
            </Grid>

            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={4}
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
            </Grid>

            <Grid item xs={12}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={2}
              >
                <ButtonGridItem item xs={12} sm="auto">
                  <Button
                    {...calApi != null ? ({
                      onClick: () => setMeetingDialogState((prevState) => ({
                        ...prevState,
                        open: true,
                      }))
                    }) : ({
                      href: urls.calcom,
                      target: '_blank'
                    })}
                    variant="contained"
                    color="primary"
                    size="large"
                    disableTouchRipple
                  >
                    Prendre rendez-vous
                  </Button>
                </ButtonGridItem>

                {/* <ButtonGridItem item xs={12} sm='auto'>
                <Button
                  href={urls.maltQuote}
                  variant='contained'
                  color='primary'
                  size='large'
                >
                  Devis gratuit
                </Button>
              </ButtonGridItem> */}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Hero>
    )
  },
)
