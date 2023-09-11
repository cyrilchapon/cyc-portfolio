import { getPaddingTop, Hero, HeroProps } from '$components/hero'
import { urls } from '$constants'
// import { ContactPaper } from './about-me-contact-paper'
import {
  Box,
  Button,
  Grid,
  Link,
  styled,
  Typography,
  TypographyProps,
} from '@mui/material'
import { forwardRef, ForwardRefExoticComponent } from 'react'

const FullHeightHero = styled(Hero)(() => ({
  paddingTop: 0,
  paddingBottom: 0,
  minHeight: 'auto',
}))

const ImgGridContainer = styled(Grid)(({ theme }) => ({
  minHeight: '100vh',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}))

const ImgGridItem = styled(Grid)(() => ({
  backgroundImage: `url(${homereImg})`,
  backgroundSize: 'cover',
}))

const ParagraphGridContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: theme.spacing(4),
  ...getPaddingTop(theme)(true),
  minHeight: '100vh',
  [theme.breakpoints.down('lg')]: {
    background: `url(${homereImg})`,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.default,
      zIndex: 1,
      opacity: 0.6,
    },
  },
}))

const ParagraphGridItem = styled(Box)(({ theme }) => ({
  maxWidth: '600px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto',
  // minHeight: '100vh',
  [theme.breakpoints.down('lg')]: {
    zIndex: 2,
  },
  // [theme.breakpoints.up('lg')]: {
  //   justifySelf: 'flex-start'
  // }
}))

const BodyParagraph = styled(Typography)<
  TypographyProps<'div', { component: 'div' }>
>(() => ({
  textAlign: 'justify',
  // '& > p:first-of-type': {
  //   marginTop: 0
  // },
  '& > p:last-of-type': {
    marginBottom: 0,
  },
}))

const homereImg =
  'https://images.prismic.io/cyc-portfolio/b2e8a189-5978-468f-b079-5acb0de925d6_IMG_7680_eff41a08-ea2e-4c54-972a-d918e68ad608_2000x.jpeg?auto=compress,format'

export const HomereHero: ForwardRefExoticComponent<HeroProps> = forwardRef(
  (props, ref) => {
    return (
      <FullHeightHero bgcolor="background.default" ref={ref} {...props}>
        {/* <Container> */}
        <Grid
          flex={1}
          container
          direction="row"
          justifyContent="center"
          spacing={0}
        >
          <ParagraphGridContainer item xs={12} lg={6} container>
            <ParagraphGridItem flex={1} display="flex" flexDirection="column">
              <Grid flex={1} container direction="column" spacing={8}>
                <Grid item>
                  <Typography
                    variant="h3"
                    component="h2"
                    textAlign={{ xs: 'center', lg: 'left' }}
                  >
                    Homère
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    textAlign={{ xs: 'center', lg: 'left' }}
                  >
                    Mon projet de coeur
                  </Typography>

                  <BodyParagraph
                    variant="body1"
                    component="div"
                    textAlign={{ xs: 'justify', lg: 'left' }}
                  >
                    <p>
                      En 2020, avec mon associé{' '}
                      <Link href={urls.linkedInMarco} target="_blank">
                        Marc-Antoine CALZADA
                      </Link>{' '}
                      nous avons lancé la Marketplace{' '}
                      <strong>
                        <Link href={urls.homere} target="_blank">
                          Homère Shop
                        </Link>
                      </strong>
                      . J&apos;en ai été le CEO &amp; CTO durant 2 ans.
                    </p>

                    <p>
                      Homère, c&apos;était une boutique de{' '}
                      <strong>
                        vêtements masculins éco-responsables de qualité
                      </strong>
                      . On dénichait les plus belles{' '}
                      <strong>marques durables</strong> de France, et on
                      proposait leurs fringues incroyables sur notre Marketplace
                      en ligne.
                    </p>

                    <p>
                      Un projet de coeur, qui a résonné très fort avec mes{' '}
                      <strong>valeurs personnelles</strong>, tout en étant une
                      base de business solide et scalable comme je les aime.
                    </p>
                  </BodyParagraph>
                </Grid>

                <Grid item container justifyContent="center">
                  <Grid item xs="auto" lg={12}>
                    <Button href={urls.homere} variant="contained" size="large">
                      Découvrir Homère
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </ParagraphGridItem>
          </ParagraphGridContainer>

          <ImgGridContainer item xs={12} lg={6} container spacing={0}>
            <ImgGridItem item xs={12}></ImgGridItem>
          </ImgGridContainer>
        </Grid>
        {/* </Container> */}
      </FullHeightHero>
    )
  },
)
