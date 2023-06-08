import {Request, Response, Router} from "express";

export const addressesRouter = Router({});

const addresses = [
  {id: 1, value: 'Abdul 13'},
  {id: 2, value: 'Sel 33'}
];
addressesRouter.get('/', (req: Request, res: Response) => {
  res.send(addresses);
});
addressesRouter.get('/:id', (req: Request, res: Response) => {
  const address = addresses.find((p) => p.id === +req.params.id);
  if (address) res.send(address);
  else res.send(404);
});
