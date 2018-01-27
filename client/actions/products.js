// @flow

import { setDataSetAction } from 'redux-dataset'
import type { Dispatch } from 'redux'
import type { SetDataSetAction } from 'redux-dataset'
import { PRODUCT_DETAIL, PRODUCTS_LIST } from '../constants/dataSets'
import AppError from '../errors/app'
import type { ProductPreview, Product } from '../types'


const SUCCESS_STATUS = 200

export const fetchAll = () => (
  (dispatch: Dispatch<SetDataSetAction<ProductPreview>>): Promise<ProductPreview[]> => {
    dispatch(setDataSetAction(PRODUCTS_LIST, [], false))

    return fetch('http://localhost:3000/api/v1.0/products')
      .then(res => {
        if (res.status !== SUCCESS_STATUS) {
          throw new AppError(res.statusText, res.status)
        }

        return res.json()
      })
      .then(
        data => {
          dispatch(setDataSetAction(PRODUCTS_LIST, data, true))

          return data
        },
        err => {
          // notification user about error
          dispatch(setDataSetAction(PRODUCTS_LIST, [], true))
          if (!err.status) {
            throw new AppError(err.message)
          }

          throw err
        }
      )
  }
)

export const get = (id: string) => (
  (dispatch: Dispatch<SetDataSetAction<Product>>): Promise<Product[]> => {
    dispatch(setDataSetAction(PRODUCT_DETAIL, [], false))

    return fetch(`http://localhost:3000/api/v1.0/products/${id}`)
      .then(res => {
        if (res.status !== SUCCESS_STATUS) {
          throw new AppError(res.statusText, res.status)
        }

        return res.json()
      })
      .then(
        data => {
          dispatch(setDataSetAction(PRODUCT_DETAIL, [data], true))

          return data
        },
        err => {
          // notification user about error
          dispatch(setDataSetAction(PRODUCT_DETAIL, [], true))

          if (!err.status) {
            throw new AppError(err.message)
          }

          throw err
        }
      )
  }
)

export const save = (id: string, product: Product) => (
  (dispatch: Dispatch<SetDataSetAction<Product>>): Promise<Product> => {
    dispatch(setDataSetAction(PRODUCT_DETAIL, [{ id, ...product }], false))

    return fetch(`http://localhost:3000/api/v1.0/products/${id}`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(res => {
        if (res.status !== SUCCESS_STATUS) {
          throw new AppError(res.statusText, res.status)
        }

        return res.json()
      })
      .then(
        data => {
          dispatch(setDataSetAction(PRODUCT_DETAIL, [data], true))

          return data
        },
        err => {
          // notification user about error
          dispatch(setDataSetAction(PRODUCT_DETAIL, [{ id, ...product }], true))

          if (!err.status) {
            throw new AppError(err.message)
          }

          throw err
        }
      )
  }
)
