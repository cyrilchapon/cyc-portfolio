import * as React from 'react'
import Head from 'next/head'
import { Header } from '$components/header'
import { Main } from '$components/main'
import { NextPage } from 'next'
import { ArchiHero } from '$components/heroes/archi-hero'

const Tech: NextPage = () => {
  return (
    <>
      <Head>
        <title>
          Cyril CHAPON — Consultant stratégie produit &amp; CTO en freelance
        </title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <Header />

      <Main>
        <ArchiHero id="archi" escapeHeader />
      </Main>
    </>
  )
}

export default Tech
