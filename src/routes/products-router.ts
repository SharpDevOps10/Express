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
  (req: Request, res: Response) => {
    const newProduct = productsRepository.createProduct(req.body.title);
    res.status(201).send(newProduct);
  }
);

productsRouter.get('/', (req: Request, res: Response) => {
  const foundProducts = productsRepository.findProducts(
    req.query.title?.toString()
  );
  res.send(foundProducts);
});

productsRouter.get('/:id', (req: Request, res: Response) => {
  const product = productsRepository.getProductById(+req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.send(404);
  }
});

productsRouter.put(
  '/:id',
  titleValidation,
  inputValidation,
  (req: Request, res: Response) => {
    const isUpdated = productsRepository.updateProduct(
      +req.params.id,
      req.body.title
    );

    if (isUpdated) {
      const product = productsRepository.getProductById(+req.params.id);
      res.send(product);
    } else {
      res.send(404);
    }
  }
);

productsRouter.delete('/:id', (req: Request, res: Response) => {
  const isDeleted = productsRepository.deleteProduct(+req.params.id);
  if (isDeleted) {
    res.send(204);
  } else {
    res.send(404);
  }
});
