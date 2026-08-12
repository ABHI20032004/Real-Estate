import express from "express";

import {
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

const router = express.Router();


// Update User
router.put("/update/:id", updateUser);

router.delete("/delete/:id", deleteUser);


export default router;