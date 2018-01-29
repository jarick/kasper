// @flow

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm, getFormValues, change } from 'redux-form'
import { getDataSelector } from 'redux-dataset'
import { compose, setDisplayName, withProps, withState } from 'recompose'
import { createSelector } from 'reselect'
import get from 'lodash/get'
import Component from '../components/product'
import actions  from '../actions'
import { PRODUCT_DETAIL } from '../constants/dataSets'


const form = 'product-form'

export default compose(
  setDisplayName('ProductContainer'),
  withProps({ form }),
  withState('mode', 'setMode', 'view'),
  connect(
    createSelector(
      getDataSelector(PRODUCT_DETAIL),
      ({ data, load }) => ({
        initialValues: get(data, '[0]', { name: '', price: 0, preview: '', image: '' }),
        load
      })
    )
  ),
  reduxForm({
    enableReinitialize: true,
    onSubmit(values, dispatch, { setMode }) {
      const { id, price, ...data } = values

      return actions.products.save(id, { price: parseFloat(price), ...data })(dispatch)
        .then(() => setMode('view'))
    }
  }),
  connect(
    state => ({
      values: getFormValues(form)(state)
    }),
    (dispatch) => ({
      formActions: bindActionCreators({ change }, dispatch)
    })
  )
)(Component)
