import { Hero, HeroProps } from '$components/hero'
import { Grid, styled } from '@mui/material'
import { FunctionComponent } from 'react'

const BoxedHero = styled(Hero)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const GridCol = styled(Grid)(() => ({
  minHeight: '500px'
}))

const GridLeftCol = styled(GridCol)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main
}))

const GridRightCol = styled(GridCol)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main
}))

const GridCell = styled(Grid)(() => ({
  minHeight: '100px'
}))

const GridLeftCell = styled(GridCell)(() => ({
  backgroundImage: 'linear-gradient(45deg, rgba(0, 0, 0, 0.3) 25%, transparent 25%), linear-gradient(-45deg, rgba(0, 0, 0, 0.3) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0, 0, 0, 0.3) 75%), linear-gradient(-45deg, transparent 75%, rgba(0, 0, 0, 0.3) 75%)',
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
}))

const GridRightCell = styled(GridCell)(() => ({
  backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%), linear-gradient(-45deg, rgba(255, 255, 255, 0.3) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.3) 75%), linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.3) 75%)',
  backgroundSize: '20px 20px',
  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
}))

export const GridTesterHero: FunctionComponent<HeroProps> = (props) => {
  return (
    <BoxedHero {...props}>
      <Grid
        container direction='row' justifyContent='center'
        spacing={0}
      >
        <GridLeftCol
          item xs={12} lg={6}
          container direction='row' spacing={0} justifyContent='center'
        >
          <GridLeftCell
            item xs={12} lg={6}
          >
          </GridLeftCell>

          <GridRightCell
            item xs={12} lg={6}
          >
          </GridRightCell>
        </GridLeftCol>

        <GridRightCol
          item xs={12} lg={6}
          container direction='row' spacing={0} justifyContent='center'
        >
          <GridLeftCell
            item xs={12} lg={6}
          >
            some content
          </GridLeftCell>

          <GridRightCell
            item xs={12} lg={6}
          >
          </GridRightCell>
        </GridRightCol>
      </Grid>

      <Grid
        container direction='row' justifyContent='center'
        spacing={6}
      >
        <GridLeftCol
          item xs={12} lg={6}
          container direction='row' spacing={2} justifyContent='center'
        >
          <GridLeftCell
            item xs={12} lg={6}
          >
          </GridLeftCell>

          <GridRightCell
            item xs={12} lg={6}
          >
          </GridRightCell>
        </GridLeftCol>

        <GridRightCol
          item xs={12} lg={6}
          container direction='row' spacing={4} justifyContent='center'
        >
          <GridLeftCell
            item xs={12} lg={6}
          >
            some content
          </GridLeftCell>

          <GridRightCell
            item xs={12} lg={6}
          >
          </GridRightCell>
        </GridRightCol>
      </Grid>
    </BoxedHero>
  )
}
