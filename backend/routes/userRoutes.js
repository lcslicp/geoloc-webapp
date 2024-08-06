import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";

const router = Router();

router.post('/signup', createUser);
router.get('/login', loginUser);

export default router;