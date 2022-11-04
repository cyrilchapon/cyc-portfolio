import { Hero, HeroProps } from '$components/hero'
import { ResumeTimeline } from './resume-timeline'
import { ImgPaper } from '$components/papers/img-paper'
import { useResponsive } from '$styles/media-query'
import { Button, Container, Grid, NoSsr, styled, Typography, useTheme } from '@mui/material'
import { forwardRef, ForwardRefExoticComponent } from 'react'
import { timelineContentClasses } from '@mui/lab'
import { urls } from '$constants'

const ImgGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    alignItems: 'flex-start'
  }
}))

const MyselfImgPaper = styled(ImgPaper, { name: 'pifpaf', label: 'pouf' })(() => ({
  width: 'auto',
  maxWidth: '100%',
  height: 'auto'
}))

const mySelfHeightImg = 'https://images.prismic.io/cyc-portfolio/4385c431-9a42-44ba-a51c-424d5b4455ba_IMG_8947-retouche.jpg?auto=compress,format&ar=3:4&fit=crop&crop=faces,center&w=800'
const mySelfWideImg = 'https://images.prismic.io/cyc-portfolio/4385c431-9a42-44ba-a51c-424d5b4455ba_IMG_8947-retouche.jpg?auto=compress,format&ar=4:2&fit=crop&fp-x=0.3&fp-y=0.6&w=1200'

export const ResumeHero: ForwardRefExoticComponent<HeroProps> = forwardRef((props, ref) => {
  const r = useResponsive()
  const theme = useTheme()

  const myselfSrc = r({
    xs: mySelfWideImg,
    lg: mySelfHeightImg
  }, mySelfHeightImg)

  return (
    <>
      <Hero bgcolor='background.default' ref={ref} {...props}>
        <Container>
          <Grid
            container direction='row' justifyContent='center'
            spacing={{
              xs: 4,
              md: 4,
              lg: 8
            }}
          >
            <Grid
              item xs={12} lg={4} order={{ xs: 2, lg: 1 }}
              container direction='row' spacing={4} justifyContent='center'
            >
              <Grid item xs={12}>
                <Typography variant='h3' component='h2' textAlign={{ xs: 'center', lg: 'right' }}>
                  Parcours
                </Typography>

                <Typography variant='subtitle1' textAlign={{ xs: 'center', lg: 'right' }}>
                  Mon expérience
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <ResumeTimeline
                  position='right'
                  sx={{
                    p: 0,
                    [`& .${timelineContentClasses.root}`]: {
                      [theme.breakpoints.up('lg')]: {
                        flex: 0
                      }
                    },
                  }}
                />
              </Grid>

              <Grid
                item xs={12}
                container direction='row' justifyContent={{ xs: 'center', lg: 'flex-end' }}
              >
                <Grid item>
                  <Button
                    component='a'
                    href={urls.linkedIn}
                    target='_blank'
                    variant='outlined'
                    size='large'
                    color='neutral'
                    disableTouchRipple
                  >
                    Découvrir
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <ImgGrid
              item xs={12} lg={6} order={{ xs: 1, lg: 2 }}
              container direction='column' justifyContent='center' alignItems='center'
            >
              <Grid item>
                {/* Defer rendering because of responsive capacities */}
                <NoSsr>
                  <MyselfImgPaper
                    elevation={2}
                    src={myselfSrc}
                    square
                  />
                </NoSsr>
              </Grid>
            </ImgGrid>
          </Grid>
        </Container>
      </Hero>
    </>
  )
})
