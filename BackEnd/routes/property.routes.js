import express from 'express';
const router = express.Router();

import {
  addProperty,
  getBuyProperties,
  getRentProperties,
  getPropertyById,
  getMyProperties,
  deleteProperty
} from '../controllers/property.controllers.js';

router.post("/", addProperty);

router.get("/buy", getBuyProperties);

router.get("/rent", getRentProperties);

router.get("/my-properties", getMyProperties);

router.delete("/:id", deleteProperty);

router.get("/:id", getPropertyById);





export default router;