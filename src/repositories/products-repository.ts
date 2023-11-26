import {client} from "./db";

export type ProductType = {
  id: number;
  title: string;
};

export const productsRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    if (title) return await client.db('shop').collection<ProductType>('products').find({
      title: {
        $regex: title,
      },
    }).toArray();
    else return await client.db('shop').collection<ProductType>('products').find({}).toArray();
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date(),
      title: title,
    };
    await client.db('shop').collection<ProductType>('products').insertOne(newProduct);
    return newProduct;
  },
  async getProductById(id: number): Promise<ProductType | null> {
    return await client.db('shop').collection<ProductType>('products').findOne({id});
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const result = await client.db('shop').collection<ProductType>('products').updateOne(
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
    const result = await client.db('shop').collection<ProductType>('products').deleteOne({id});
    return result.deletedCount === 1;
  }
};
