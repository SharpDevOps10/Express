import {client} from "./db";

export type ProductType = {
  id: number;
  title: string;
};

const products: ProductType[] = [{ id: 1, title: 'apricot' }, { id: 1, title: 'orange' }];
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
    products.push(newProduct);
    return newProduct;
  },
  async getProductById(id: number): Promise<ProductType | null> {
    return await client.db('shop').collection<ProductType>('products').findOne({id})
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
  async deleteProduct(id: number): Promise<boolean> {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products.splice(i, 1);
        return true;
      }
    }
    return false;
  }
};
