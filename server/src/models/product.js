// @flow

import Joi from 'joi';
import type { DB, Model, Product, ProductPreview } from '../types';
import NotFoundError from '../errors/not-found';
import AppError from '../errors/app';
import ValidateError from '../errors/validate';
import { PRODUCT_MODAL } from '../constants';


export default (db: DB) => ({
  fetch(): Promise<ProductPreview[]> {
    const entity = db.entities.find(({ name }) => name === PRODUCT_MODAL);

    if (entity) {
      const result = entity.data.map(({ pk, data: { name, price } }) => ({ id: pk, name, price }));

      return Promise.resolve(result);
    }
    return Promise.reject(new AppError('Product entity is not set'));
  },
  get(id: string): Promise<Product> {
    const entity = db.entities.find(({ name }) => name === PRODUCT_MODAL);

    if (entity) {
      const result = entity.data
        .map(({ pk, data }) => ({ id: pk, ...data }))
        .find(item => item.id === id);

      if (result) {
        return Promise.resolve(result);
      }
      return Promise.reject(new NotFoundError('Product is not found'));
    }
    return Promise.reject(new AppError('Product entity is not set'));
  },
  save(id: string, product: Product): Promise<Model<Product>> {
    const schema = Joi.object().keys({
      name: Joi.string().max(255).required(),
      price: Joi.number().required(),
      preview: Joi.string().max(255).required(),
      image: Joi.string().max(255).required(),
    });
    const options = {
      abortEarly: false,
      allowUnknown: false,
      convert: false,
    };
    const { error } = Joi.validate(product, schema, options);

    if (error) {
      return Promise.reject(new ValidateError(error));
    }

    const entity = db.entities.find(({ name }) => name === PRODUCT_MODAL);

    if (entity) {
      const find = entity.data.find(({ pk }) => pk === id);

      if (find) {
        const save = entity.data
          .filter(({ pk }) => pk !== id)
          .concat({ pk: id, data: product });

        // eslint-disable-next-line
        db.entities = db.entities
          .filter(({ name }) => name !== PRODUCT_MODAL)
          .concat({ name: PRODUCT_MODAL, data: save });

        return Promise.resolve({ pk: id, data: product });
      }
      return Promise.reject(new NotFoundError('Product is not found'));
    }
    return Promise.reject(new AppError('Product entity is not set'));
  },
});
