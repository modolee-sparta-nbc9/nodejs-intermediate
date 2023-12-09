// src/repositories/products.repository.js

import { prisma } from '../utils/prisma/index.js';

export class ProductsRepository {
  findAllProducts = async () => {
    // ORM인 Prisma에서 products 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const products = await prisma.products.findMany();

    return products;
  };

  findProductById = async (productsId) => {
    // ORM인 Prisma에서 products 모델의 findUnique 메서드를 사용해 데이터를 요청합니다.
    const Product = await prisma.products.findUnique({
      where: { productsId: +productsId },
    });

    return Product;
  };

  createProduct = async (nickname, password, title, content) => {
    // ORM인 Prisma에서 products 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdProduct = await prisma.products.create({
      data: {
        nickname,
        password,
        title,
        content,
      },
    });

    return createdProduct;
  };

  updateProduct = async (productsId, password, title, content) => {
    // ORM인 Prisma에서 products 모델의 update 메서드를 사용해 데이터를 수정합니다.
    const updatedProduct = await prisma.products.update({
      where: {
        productsId: +productsId,
        password: password,
      },
      data: {
        title,
        content,
      },
    });

    return updatedProduct;
  };

  deleteProduct = async (productsId, password) => {
    // ORM인 Prisma에서 products 모델의 delete 메서드를 사용해 데이터를 삭제합니다.
    const deletedProduct = await prisma.products.delete({
      where: {
        productsId: +productsId,
        password: password,
      },
    });

    return deletedProduct;
  };
}
