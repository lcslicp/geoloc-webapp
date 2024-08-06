import { Router } from "express";
import { getUserIPAddress, getIPAddress, postSearchHistory } from "../controllers/ipDataController.js";

const router = Router();

router.get('/userip', getUserIPAddress)
router.get('/searchip', getIPAddress)
router.post('/searchHistory', postSearchHistory)


export default router;