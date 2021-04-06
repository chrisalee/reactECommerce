import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import data from "../data.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
  "/seed",
  expressAsyncHandler(async (request, response) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    response.send({ createdUsers });
  })
);

userRouter.post(
  "/signin",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findOne({ email: request.body.email });
    if (user) {
      if (bcrypt.compareSync(request.body.password, user.password)) {
        response.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user),
        });
        return;
      }
    }
    response.status(401).send({ message: "Invalid email or password" });
  })
);

export default userRouter;
