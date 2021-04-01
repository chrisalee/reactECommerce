import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import data from '../data.js';

const userRouter = express.Router();

userRouter.get('/seed', expressAsyncHandler(async(request, response) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    response.send({ createdUsers });
}));

export default userRouter;