import {client} from "./db";

export type ProductType = {
  id: number;
  title: string;
};

const productCollection = client.db('shop').collection<ProductType>('products');

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    if (title) return await productCollection.find({
      title: {
        $regex: title,
      },
    }).toArray();
    else return await productCollection.find({}).toArray();
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date(),
      title: title,
    };
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
