import jwt from "jsonwebtoken";
import { createdError } from "./Error.js";

// Token verification
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createdError(401, " authenticate off"));
  }
  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) return next(createdError(403, "Your token is not valid!"));
    req.user = user;
    next();
  });
};
// user verification
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createdError(403, "You are not authorize"));
    }
  });
};
export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};
