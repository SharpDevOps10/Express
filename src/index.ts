import express, {Request, Response} from 'express';

const app = express();
const port = process.env.PORT || 5000;

const products = [{title: 'apricot'}, {title: 'orange'}];
const addresses = [{value: 'Abdul 13'}, {value: 'Sel 33'}];
app.get('/products', (req: Request, res: Response) => {
  res.send(products);
});

app.get('/products/:productTitle', (req: Request, res: Response) => {
  const product = products.find((p) => p.title === req.params.productTitle);
  res.send(product);
});

app.get('/addresses', (req: Request, res: Response) => {
  res.send(addresses);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});