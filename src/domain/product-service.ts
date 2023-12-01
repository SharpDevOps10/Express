import { productsRepository, ProductType } from '../repositories/products-repository';

export const productsService = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    return await productsRepository.findProducts(title);
  },
  async createProduct(title: string): Promise<ProductType> {
    const newProduct = {
      id: +new Date(),
      title: title,
    };
    return await productsRepository.createProduct(newProduct);
  },
  async getProductById(id: number): Promise<ProductType | null> {
    return await productsRepository.getProductById(id);
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    return await productsRepository.updateProduct(id, title);
  },
  async deleteProduct(id: number): Promise<boolean> {
    return productsRepository.deleteProduct(id);
  }
};