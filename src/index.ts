import express, {Request, Response} from 'express';

const app = express();
const port = process.env.PORT || 5000;

const products = [{id: 1, title: 'apricot'}, {id: 1, title: 'orange'}];
const addresses = [{id: 1, value: 'Abdul 13'}, {id: 2, value: 'Sel 33'}];
app.get('/products', (req: Request, res: Response) => {
  if (req.query.title) {
    const searchString = req.query.title.toString();
    res.send(products.filter((p) => p.title.indexOf(searchString) > -1));
  } else {
    res.send(products);
  }
});

app.get('/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.title === req.params.id);
  if (product) res.send(product);
  else res.send(404);
});

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