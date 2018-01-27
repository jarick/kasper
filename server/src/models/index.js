// @flow

import ProductModel from './product';
import { DB } from '../constants';

const db = { ...DB };

export default {
  Products: ProductModel(db),
};
