import { Router } from "express";
import { SearchProduct } from "../controller/product.controller.ts";

const router = Router();

router.route("/skincare").post(SearchProduct);

export default router;