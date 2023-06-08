import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import {productsRouter} from "./routes/products-router";

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

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses);
});
app.get('/addresses/:id', (req: Request, res: Response) => {
  const address = addresses.find((p) => p.id === +req.params.id);
  if (address) res.send(address);
  else res.send(404);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
