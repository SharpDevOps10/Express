import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-route";

const app = express();
const port = process.env.PORT || 5000;

const products = [
  {id: 1, title: 'apricot'},
  {id: 1, title: 'orange'}
];
const addresses = [
  {id: 1, value: 'Abdul 13'},
  {id: 2, value: 'Sel 33'}
];

const parserMiddleWare = bodyParser({});
app.use(parserMiddleWare);

app.use('/products', productsRouter);
app.use('/addr', addressesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
