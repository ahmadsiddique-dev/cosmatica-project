import { Router } from "express";
import { SearchProduct } from "../controller/product.controller.ts";
import { upload } from "../lib/uploader.ts";

const router = Router();

router.route("/skincare").post(upload.single("searchImage"), SearchProduct);

export default router;
