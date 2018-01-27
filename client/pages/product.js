// @flow

import React from 'react'
import withRedux from 'next-redux-wrapper'
import ErrorPage from 'next/error'
import { compose, setDisplayName, pure, withProps } from 'recompose'
import Product from '../containers/product'
import actions from '../actions'
import initStore from '../store'

const Page: any = compose(
  setDisplayName('ProductPage'),
  withProps({
    title: 'Product page',
  }),
  pure
)(({ err, ...props }) => (
  err ? <ErrorPage statusCode={err.status} /> : <Product {...props} />
))

Page.getInitialProps = ({ store, isServer, req: { params: { id } } }) => (
  actions.products.get(id)(store.dispatch)
    .then(
      () => ({ isServer }),
      err => ({ err })
    )
)

export default withRedux(initStore)(Page)
