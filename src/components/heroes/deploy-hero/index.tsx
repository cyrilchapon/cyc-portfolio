import { Hero, HeroProps } from '$components/hero'
import { Container, Grid, Paper, styled, Typography } from '@mui/material'
import { forwardRef, ForwardRefExoticComponent } from 'react'
import { ReactFlowProvider } from 'reactflow'
import { useResizeDetector } from 'react-resize-detector'
import { CustomReactFlow } from './react-flow'
import { useForwardedRef } from '../../../hooks/use-forward-ref'
import { useResponsive } from '$styles'

const PanelPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.flowNode,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  [theme.breakpoints.up('sm')]: {
    height: '100%',
    overflow: 'scroll',
  },
}))

const PanelGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    height: '100%',
  },
}))

const ReactFlowGrid = styled(Grid)(({ theme }) => ({
  height: '100vh',
  [theme.breakpoints.up('sm')]: {
    height: '100%',
  },
}))

export const DeployHero: ForwardRefExoticComponent<HeroProps> = forwardRef(
  (props, ref) => {
    const innerRef = useForwardedRef(ref)

    const { width: heroWidth, height: heroHeight } = useResizeDetector({
      targetRef: innerRef,
    })

    const r = useResponsive()
    const fixedContainer = r(
      {
        xs: true,
        sm: false,
        md: true,
      },
      true,
    )

    return (
      <Hero
        bgcolor="transparent"
        ref={innerRef}
        {...props}
        sx={{ height: { sm: '100vh' } }}
      >
        <Container fixed={fixedContainer} sx={{ height: { sm: '100%' } }}>
          <Grid container spacing={2} sx={{ height: { sm: '100%' } }}>
            <PanelGrid item xs={12} sm={6} md={5} lg={4} justifySelf="stretch">
              <PanelPaper elevation={0} variant="outlined">
                <Typography variant="h4" gutterBottom>
                  Déploiement
                </Typography>

                <Typography
                  component="div"
                  variant="body1"
                  textAlign={{ xs: 'justify', md: 'left' }}
                >
                  <p>
                    J'ai conçu ce site web comme une{' '}
                    <strong>Static&nbsp;App</strong>. Il s'agit d'une webapp qui
                    tire le meilleur des deux mondes entre site{' '}
                    <em>dynamique</em> (contenu "live") et <em>statique</em>{' '}
                    (rapidité, simplicité).
                  </p>

                  <p>
                    Cette technologie — plus connue sous le nom de{' '}
                    <strong>JAMStack</strong> — repose sur le concept de
                    pré-construire les pages web, plutôt que de le faire à la
                    volée pour chaque requête.
                  </p>

                  <p>
                    J'utilise ici un ensemble d'outils pour automatiser le build
                    et le deploy. Survolez les éléments du diagramme pour en
                    apprendre davantages !
                  </p>
                </Typography>
              </PanelPaper>
            </PanelGrid>

            <ReactFlowGrid item xs={12} sm={6} md={7} lg={8}>
              <ReactFlowProvider>
                <CustomReactFlow
                  parentWidth={heroWidth ?? null}
                  parentHeight={heroHeight ?? null}
                />
              </ReactFlowProvider>
            </ReactFlowGrid>
          </Grid>
        </Container>
      </Hero>
    )
  },
)
