// @flow

import { PRODUCT_MODAL } from './models';

export default {
  entities: [
    {
      name: PRODUCT_MODAL,
      data: [{
        pk: '1',
        data: {
          name: 'test-product',
          price: 10.1,
          preview: 'preview',
          image: 'http://image.com',
        },
      }],
    },
  ],
};
