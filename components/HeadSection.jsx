import React from 'react'
import Head from 'next/head'

export default function HeadSection({title}) {
  return (
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    </Head>
  )
}
