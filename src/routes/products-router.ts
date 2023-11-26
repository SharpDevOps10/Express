import { Request, Response, Router } from 'express';
import { productsRepository } from '../repositories/products-repository';
import { body } from 'express-validator';
import { inputValidation } from '../middlewares/input-validation-middleware';

export const productsRouter = Router({});

const titleValidation = body('title')
  .isLength({ min: 3, max: 10 })
  .withMessage('Length should be between 3 and 10');

productsRouter.post(
  '/',
  titleValidation,
  inputValidation,
  async (req: Request, res: Response) => {
    const newProduct = await productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
  }
);

productsRouter.get('/', async (req: Request, res: Response) => {
  const foundProducts = await productsRepository.findProducts(req.query.title?.toString());
  res.send(foundProducts);
});

productsRouter.get('/:id', async (req: Request, res: Response) => {
  const product = await productsRepository.getProductById(+req.params.id);
  if (product) res.send(product);
  else res.send(404);
});

productsRouter.put(
  '/:id',
  titleValidation,
  inputValidation,
  async (req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title);

    if (isUpdated) {
      const product = await productsRepository.getProductById(+req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);

productsRouter.delete('/:id', async (req: Request, res: Response) => {
  const isDeleted = await productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) res.send(204);
  else res.send(404);
});
