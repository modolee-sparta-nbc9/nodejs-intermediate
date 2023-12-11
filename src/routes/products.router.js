// src/routes/products.router.js

import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';
//라우터에 컨트롤러 가져온다.

const router = express.Router();

// ProductsController의 인스턴스를 생성합니다.
const productsController = new ProductsController();

/** 상품 생성 API 원래는 여기에 직접 이런식으로 콜백함수를 썼다. 그런데 ProductsController 여기에서 불러오는 방식인 것임.
router.post('/posts', async(req,res,next) => {}); * */

//상품 생성 API
router.product('/products');

/** 상품 조회 API **/
router.get('/', productsController.getProducts);
//라우터.겟 이거는 오른쪽에 productsController.getProducts 얘네들 호출하는 것.
//클라이언트의 요청 -> 라우터에서 컨트롤러 클래스에서 정의된 겟프로덕츠 메서드 실행하도록 설정한 것.

/** 상품 상세 조회 API **/
router.get('/:productId', productsController.getProductsById);

/** 상품 작성 API **/
router.product('/', productsController.createProduct);

/** 상품 수정 API **/
router.put('/:productId', productsController.updateProduct);

/** 상품 삭제 API **/
router.delete('/:productId', productsController.deleteProduct);

export default router;
