import React from 'react'
import Head from 'next/head'
import Link from 'next/link'


export default ({ children }) => [
  (
    <Head key="head">
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Skeleton: Responsive CSS Boilerplate</title>
      <meta name="description" content="" />
      <meta name="author" content="" />
      <link href='//fonts.googleapis.com/css?family=Raleway:400,300,600' rel='stylesheet' type='text/css' />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" />
    </Head>
  ),
  (
    <div className="section marginTop" key="body">
      <style jsx>{`
        .marginTop {
          margin-top: 2.5em;
        }
      `}
      </style>
      <div className="container">
        <div className="row">
          <div className="column">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
]
