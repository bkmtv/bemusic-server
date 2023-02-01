import express from "express";

import { getItems, createItem } from "../controllers/item.js";

const router = express.Router();

router.get("/", getItems);
router.post("/", createItem);

export default router;