// @flow

import { connect } from 'react-redux'
import { compose, setDisplayName, pure } from 'recompose'
import { createSelector } from 'reselect'
import { getDataSelector } from 'redux-dataset'
import Component from '../components/products'
import { PRODUCTS_LIST } from '../constants/dataSets'


export default compose(
  setDisplayName('ProductsContainer'),
  connect(
    createSelector(
      getDataSelector(PRODUCTS_LIST),
      ({ data, load }) => ({
        list: data || [],
        load
      })
    )
  ),
  pure
)(Component)
