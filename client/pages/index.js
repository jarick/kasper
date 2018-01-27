// @flow

import React from 'react'
import withRedux from 'next-redux-wrapper'
import ErrorPage from 'next/error'
import { compose, setDisplayName, pure, withProps } from 'recompose'
import Products from '../containers/products'
import actions from '../actions'
import initStore from '../store'


const Page: any = compose(
  setDisplayName('ProductsPage'),
  withProps({
    title: 'Products page',
  }),
  pure
)(({ err, ...props }) => (
  err ? <ErrorPage statusCode={err.status} /> : <Products {...props} />
))

Page.getInitialProps = ({ store, isServer }) => (
  actions.products.fetchAll()(store.dispatch)
    .then(
      () => ({ isServer }),
      err => ({ err })
    )
)

export default withRedux(initStore)(Page)
