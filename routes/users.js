import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.js";
import { verifyToken, verifyAdmin, verifyUser } from "../utils/VerifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user you are logged in");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user you are logged in and you can delete your account");
// });
// router.get("/checkadmin/:id", verifyIsAdmin, (req, res, next) => {
//   res.send("Hello admin you are logged in and you can delete your account");
// });

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

export default router;
