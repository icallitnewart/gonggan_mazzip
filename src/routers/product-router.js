import { Router } from "express";
import { productService } from "../services/product-service";
import requestHandler from "../middlewares/async-handler";

const productRouter = Router();

productRouter.get(
  "/",
  requestHandler(async (req, res, next) => {
    {
      let resultProductList = [];
      const { category, page, perPage } = req.query;
      if (category) {
        resultProductList = await productService.getProductByCategory({
          category,
          page,
          perPage,
        });
      } else {
        resultProductList = await productService.getProductAll({
          page,
          perPage,
        });
      }
      res.status(200).json(resultProductList);
    }
  })
);

productRouter.get(
  "/:productId",
  requestHandler(async (req, res, next) => {
    {
      let resultProductDetail = {};
      const productId = req.params.productId;
      if (productId) {
        resultProductDetail = await productService.getProductInfo(productId);
      }
      res.status(200).json(resultProductDetail);
    }
  })
);

// POST /products/productIds
// Request body: {productId:['<id1>', '<id2>', '<id3>', ...]}
productRouter.post(
  "/productIds",
  requestHandler(async (req, res, next) => {
    {
      let resultProductList = [];
      const productIds = req.body.productIds;
      if (productIds) {
        resultProductList = await productService.getProductByProductIds(
          productIds
        );
      }
      res.status(200).json(resultProductList);
    }
  })
);

export { productRouter };