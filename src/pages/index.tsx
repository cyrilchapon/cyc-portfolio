import Head from 'next/head'
import { Button, Hamburger, Spacing } from '@sumup/circuit-ui'
import { Hero } from '$components/hero'
import { Header } from '$components/header'
import { Main } from '$components/main'
import { Global } from '@emotion/core'
import { Container } from '$components/container'
import { snapBody } from '$styles'

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Global styles={snapBody} />

      <Main>
        <Header title='' mobileOnly={false} snapChild>
        </Header>

        <Hero color='header' escapeHeader>
          <Spacing>
            <Container>
              Classic
            </Container>
          </Spacing>

          <Spacing top bottom>
            <Container fluid>
              Fluid
            </Container>
          </Spacing>

          <Spacing>
            <Container fullWidth>
              Full width
            </Container>
          </Spacing>
        </Hero>

        <Hero color='b500' snapChild>
          Hello
        </Hero>
      </Main>
    </>
  )
}
