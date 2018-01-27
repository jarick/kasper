// @flow

import type { $Request, $Response } from 'express';
import express from 'express';
import models from '../models';
import type { Model, Product, ProductPreview } from '../types';
import utils from '../utils';


export default () => {
  const router = express.Router();

  router.get('/', (req: $Request, res: $Response) => {
    models.Products.fetch()
      .then(
        (data: ProductPreview[]) => {
          res.status(200).json(data);
        },
        (err: Error) => {
          utils.sendError(err, res);
        },
      );
  });
  router.get('/:id', (req: $Request, res: $Response) => {
    const { id } = req.params;

    models.Products.get(id)
      .then(
        (data: Product) => {
          res.status(200).json(data);
        },
        (err: Error) => {
          utils.sendError(err, res);
        },
      );
  });
  router.post('/:id', (req: $Request, res: $Response) => {
    const { id } = req.params;

    models.Products.save(id, req.body)
      .then(
        (data: Model<Product>) => {
          res.status(200).send({ id: data.pk, ...data.data });
        },
        (err: Error) => {
          utils.sendError(err, res);
        },
      );
  });

  return router;
};
