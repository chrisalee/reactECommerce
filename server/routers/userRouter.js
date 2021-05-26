import express, { request, response } from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import data from "../data.js";
import { generateToken, isAuth, isAdmin } from "../utils.js";

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
          firstName: user.firstName,
          lastName: user.lastName,
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

userRouter.post(
  "/register",
  expressAsyncHandler(async (request, response) => {
    const user = new User({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 8),
    });
    const createdUser = await user.save();
    response.send({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  "/:id",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findById(request.params.id);
    if (user) {
      response.send(user);
    } else {
      response.status(404).send({ message: "User not found." });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (request, response) => {
    const user = await User.findById(request.user._id);
    if(user){
      user.firstName = request.body.firstName || user.firstName;
      user.lastName = request.body.lastName || user.lastName;
      user.email = request.body.email || user.email;
      if(request.body.password) {
        user.password = bcrypt.hashSync(request.body.password, 8)
      }
      const updatedUser = await user.save();
      response.send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      })
    }
  })
)

export default userRouter;
