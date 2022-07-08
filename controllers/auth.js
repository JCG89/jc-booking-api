import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createdError } from "../utils/Error.js";
// create a new user
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created!");
  } catch (error) {
    next(error);
  }
};
// Login
export const login = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password);
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createdError(404, "User not found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // jsonwebtoken
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    if (!isPasswordCorrect) return next(createdError(400, "Wrong password"));
    // Not display password and isAdmin
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...otherDetails });
  } catch (error) {
    next(error);
  }
};
