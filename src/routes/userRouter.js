import express from "express";
import registerUserController from "../controllers/users/registerUserController.js";
import loginUserController from "../controllers/users/loginUserController.js";
import validaterUserController from "../controllers/users/validaterUserController.js";
import sendRecoverPassController from "../controllers/users/sendRecoverPassController.js";
import editUserPasswordController from "../controllers/users/editUserPasswordController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUserController);
userRouter.get("/validate/:registrationCode", validaterUserController);
userRouter.post("/login", loginUserController);
userRouter.put("/password", editUserPasswordController);
userRouter.post("/password/recover", sendRecoverPassController);

export default userRouter;
