// src/controllers/posts.controller.js 심화 코드스니펫 딸깍

import { ProductsService } from '../services/products.service.js';

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class ProductsController {
  productsService = new ProductsService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getProducts = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };

  createProduct = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createdProduct = await this.productsService.createProduct(
        nickname,
        password,
        title,
        content,
      );

      return res.status(201).json({ data: createdProduct });
    } catch (err) {
      next(err);
    }
  };
}
