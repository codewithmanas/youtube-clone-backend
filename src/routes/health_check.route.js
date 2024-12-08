import { Router } from "express";
import { checkDBHealth } from "../controllers/health_check.controller.js";

const router = Router();

router.route("/").get(checkDBHealth);

export default router;