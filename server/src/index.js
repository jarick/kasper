// @flow

import express from 'express';
import { json } from 'body-parser';
import routes from './routers';


const app = express();
app.use(json());
app.use('/api/v1.0/products', routes.ProductRouter());

if (process.env.NODE_ENV !== 'test') {
  app.listen(parseInt(process.env.PORT, 10) || 3000);
}

export default app;
