import { Router } from "express";

import {
    SignupController,
    LoginController,
    RefreshController,
    LogoutController,
    MeController,
} from "../controller/auth.controller.ts";
import { RequireAuth } from "../middleware/auth.middleware.ts";

const router = Router();

// Public routes
router.post("/signup", SignupController);
router.post("/login", LoginController);
router.post("/refresh", RefreshController);
router.post("/logout", LogoutController);

// Protected routes (require a valid access token)
router.get("/me", RequireAuth, MeController);

export default router;
