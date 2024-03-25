import express from "express";
import { getById, signup } from "../controller/user.controller.js";
import { login } from "../controller/user.controller.js";



const router = express.Router();

// user routes
router.post("/signup", signup);
router.post("/signin", login);
router.get('/getById/:id', getById)

export default router;


