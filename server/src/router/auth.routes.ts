import { Router } from "express";

import {
    SignupController,
    LoginController,
    RefreshController,
    LogoutController,
} from "../controller/auth.controller.ts";

const router = Router();

router.post("/signup", SignupController);
router.post("/login", LoginController);
router.post("/refresh", RefreshController);
router.post("/logout", LogoutController);

export default router;