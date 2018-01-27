// @flow

import { get } from 'lodash';
import type { $Response } from 'express';


export default (err: any, res: $Response) => {
  switch (get(err, 'status', 500)) {
    case 404:
      res.status(404).send('');
      break;
    case 400:
      if (err.error && err.error.details) {
        res.status(400).send(err.error.details);
      }
      break;
    default:
      // eslint-disable-next-line
      console.error(err);
      res.status(500).send('');
      break;
  }
};
