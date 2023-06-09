import express from 'express';
import bodyParser from 'body-parser';
import {productsRouter} from "./routes/products-router";
import {addressesRouter} from "./routes/addresses-route";

const app = express();
const port = process.env.PORT || 5000;



const parserMiddleWare = bodyParser({});
app.use(parserMiddleWare);

app.use('/products', productsRouter);
app.use('/addresses', addressesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
