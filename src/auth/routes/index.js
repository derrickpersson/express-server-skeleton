import express from "express";
import authController from "../../auth/controller";

const auth = express.Router();

auth.post('/register', authController.register);
auth.post('/login', authController.login);

export default auth;