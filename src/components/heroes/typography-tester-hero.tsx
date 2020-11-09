import { Hero, HeroProps } from '$components/hero'
import { Container, Grid, Typography } from '@material-ui/core'
import { FunctionComponent } from 'react'

export const TypographyTesterHero: FunctionComponent<HeroProps> = (props) => {
  return (
    <Hero bgcolor='background.default' {...props}>
      <Container>
        <Grid container justify='center'>
          <Grid item xs={12} sm={6}>
            <Typography variant="h1" component="h2" gutterBottom>
              h1. Heading
            </Typography>
            <Typography variant="h2" gutterBottom>
              h2. Heading
            </Typography>
            <Typography variant="h3">
              h3. Heading
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              subtitle1. Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="h4">
              h4. Heading
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              subtitle2. Lorem ipsum dolor sit amet
            </Typography>
            <Typography variant="h5" gutterBottom>
              h5. Heading
            </Typography>
            <Typography variant="h6" gutterBottom>
              h6. Heading
            </Typography>
            <Typography variant="body1" gutterBottom>
              body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
              unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
              dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="body2" gutterBottom>
              body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
              unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
              dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.
            </Typography>
            <Typography variant="button" display="block" gutterBottom>
              button text
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              caption text
            </Typography>
            <Typography variant="overline" display="block" gutterBottom>
              overline text
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Hero>
  )
}
