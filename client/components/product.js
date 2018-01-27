// @flow

import React from 'react'
import App from './app'
import type { Product } from '../types'


type Props = {
  form: string,
  values: Product,
  handleSubmit: () => void,
  formActions: {
    change: (form:string, field: string, value: string) => void
  },
  load: boolean,
  mode: string,
  setMode: (mode: string) => void
}

export default ({
  form,
  values: { name, price, preview, image },
  handleSubmit,
  formActions: { change },
  load,
  mode,
  setMode
}: Props) => (
  <App>
    <div className="row">
      <a href="/">To main</a>
    </div>
    <div className="row">
      <button onClick={() => setMode(mode === 'edit' ? 'view' : 'edit')}>
        {mode === 'edit' ? 'View' : 'Edit'}
      </button>
    </div>
    {load ? (
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="six columns">
            <label htmlFor="name">Name</label>
            { mode === 'edit'
              ? (
                <input
                  className="u-full-width"
                  type="text"
                  maxLength={255}
                  value={name}
                  placeholder="Input name"
                  id="name"
                  onChange={e => change(form, 'name', e.target.value)}
                />
              )
              : name
            }
          </div>
          <div className="six columns">
            <label htmlFor="price">Price</label>
            { mode === 'edit'
              ? (
                <input
                  className="u-full-width"
                  type="number"
                  step="any"
                  value={price}
                  placeholder="Input price"
                  id="price"
                  onChange={e => change(form, 'price', e.target.value)}
                />
              )
              : price
            }
          </div>
        </div>
        <div className="row">
          <div className="six columns">
            <label htmlFor="preview">Preview</label>
            { mode === 'edit'
              ? (
                <input
                  className="u-full-width"
                  type="text"
                  maxLength={255}
                  value={preview}
                  placeholder="Input preview"
                  id="preview"
                  onChange={e => change(form, 'preview', e.target.value)}
                />
              )
              : preview
            }
          </div>
          <div className="six columns">
            <label htmlFor="image">Image</label>
            { mode === 'edit'
              ? (
                <input
                  className="u-full-width"
                  type="url"
                  maxLength={255}
                  value={image}
                  placeholder="Input image"
                  id="image"
                  onChange={e => change(form, 'image', e.target.value)}
                />
              )
              : image
            }
          </div>
        </div>
        <input className="button-primary" type="submit" value="Submit" />
      </form>
    ) : <span>...loading</span>}
  </App>
)
