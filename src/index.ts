import express, {Request, Response} from 'express';

const app = express();
const port = process.env.PORT || 5000;

const products = [{title: 'apricot'}, {title: 'orange'}];
const addresses = [{value: 'Abdul 13'}, {value: 'Sel 33'}];
app.get('/products', (req: Request, res: Response) => {
  res.send(products);
});

app.get('/products/:productTitle', (req: Request, res: Response) => {
  let product = products.find((p) => p.title === req.params.productTitle);
  if (product) res.send(product);
  else res.status(404);
});

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});