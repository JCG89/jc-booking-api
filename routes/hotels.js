import express from "express";
import Hotels from "../models/Hotels.js";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/VerifyToken.js";

const router = express.Router();
// CREATE

router.post("/", verifyAdmin, createHotel);
// UPDATE
router.put("/:id", verifyAdmin, updateHotel);
// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
// GET

router.get("/find/:id", getHotel);
// GETALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", getHotels);

export default router;
