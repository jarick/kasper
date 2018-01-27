// @flow

import React from 'react'
import type { Element } from 'react'
import uniqueId from 'lodash/uniqueId'
import App from './app'
import type { ProductPreview } from '../types'


type Props = {
  list: ProductPreview[],
  load: boolean
}

export default ({ list, load }: Props): Element<*> => (
  <App>
    {load ? (
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {list.map(({ id, name, price }) => (
            <tr key={uniqueId()}>
              <td><a href={`/product/${id}`}>{name}</a></td>
              <td>{price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <span>...loading</span>}
  </App>
)
