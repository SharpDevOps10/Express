import express from 'express';
import bodyParser from 'body-parser';
import { productsRouter } from './routes/products-router';
import { addressesRouter } from './routes/addresses-route';
import { runDb } from './repositories/db';


const app = express();
const port = process.env.PORT || 5000;


const parserMiddleWare = bodyParser.json();
app.use(parserMiddleWare);

app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);


const startApp = async () => {
  await runDb();
  app.listen(port, async () => console.log(`Example app listening on port ${port}`));
};

startApp()
