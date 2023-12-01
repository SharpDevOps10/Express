import { productCollection } from './db';

export type ProductType = {
  id: number;
  title: string;
};


export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {};
    if (title) filter.title = { $regex: title };

    return await productCollection.find({ filter }).toArray();
  },
  async createProduct(newProduct: ProductType): Promise<ProductType> {
    await productCollection.insertOne(newProduct);
    return newProduct;
  },
  async getProductById(id: number): Promise<ProductType | null> {
    return await productCollection.findOne({id});
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await productCollection.updateOne(
      {
        id,
      },
      {
        $set: {
          title,
        },
      },
    );
    return result.matchedCount === 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    const result = await productCollection.deleteOne({id});
    return result.deletedCount === 1;
  }
};
