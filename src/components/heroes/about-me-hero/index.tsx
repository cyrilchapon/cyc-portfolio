import { Hero, HeroProps } from '$components/hero'
import { ContactPaper } from './about-me-contact-paper'
import { ImgPaper } from '$components/papers/img-paper'
import { useResponsive } from '$styles/media-query'
import { Button, Container, Grid, NoSsr, styled, Typography, TypographyProps } from '@mui/material'
import { forwardRef, ForwardRefExoticComponent } from 'react'
import { useGlobalState } from '$global-state'

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

const BodyParagraphTypography = styled(Typography)<TypographyProps<'div', { component: 'div' }>>(() => ({
  textAlign: 'justify',
  // '& > p:first-of-type': {
  //   marginTop: 0
  // },
  '& > p:last-of-type': {
    marginBottom: 0
  }
}))

const mySelfHeightImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=2:3&fit=crop&crop=faces,center&w=600'
const mySelfWideImg = 'https://images.prismic.io/cyc-portfolio/8876ba7e-bdf6-4d48-894c-a993ca3a9b9f_moi.png?auto=compress,format&ar=4:2&fit=crop&crop=faces,center&w=1200'

export const AboutMeHero: ForwardRefExoticComponent<HeroProps> = forwardRef((props, ref) => {
  const [ , setSubscribeDialogState ] = useGlobalState('subscribeDialog')
  const r = useResponsive()

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
            <ImgGrid
              item xs={12} lg={4}
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

            <Grid
              item xs={12} lg={6}
              container direction='row' spacing={4} justifyContent='center'
            >
              <Grid item xs={12}>
                <Typography variant='h3' component='h2' textAlign={{ xs: 'center', lg: 'left' }}>
                  À propos
                </Typography>

                <Typography variant='subtitle1' gutterBottom textAlign={{ xs: 'center', lg: 'left' }}>
                  Découvrez mon profil
                </Typography>

                <BodyParagraphTypography variant='body1' component='div' textAlign={{ xs: 'justify', lg: 'left' }}>
                  <p>
                    Évoluant depuis une douzaine d&apos;années dans le milieu de la tech
                    en environnement Startup, j&apos;ai exercé en tant que Tech Lead &amp; CTO.
                  </p>

                  <p>
                    Je suis aujourd&apos;hui <strong>CEO et co-founder d&apos;Homère</strong>,
                    le site de fringues écologiques et de qualité pour homme, au format Marketplace.
                  </p>

                  <p>
                    Je fais aussi de temps en temps du consulting en <strong>stratégie Business</strong>, <strong>Produit</strong> et <strong>Technique</strong> —
                    quand le sujet m&apos;intéresse.
                  </p>
                </BodyParagraphTypography>
              </Grid>

              <Grid item xs={12} sm={10} lg={12}>
                <ContactPaper />
              </Grid>

              <Grid
                item xs={12}
                container direction='row' justifyContent='center'
              >
                <Grid item>
                  <Button
                    onClick={() => setSubscribeDialogState(prevState => ({
                      ...prevState,
                      open: true
                    }))}
                    component='button'
                    variant='contained'
                    size='large'
                    disableTouchRipple
                  >
                    Me contacter
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Hero>
    </>
  )
})
