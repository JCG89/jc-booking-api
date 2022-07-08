import Rooms from "../models/Rooms.js";
import Hotels from "../models/Hotels.js";
import { createdError } from "../utils/Error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Rooms(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotels.findByIdAndUpdate(
        hotelId,

        { $push: { rooms: savedRoom._id } }
      );
    } catch (error) {
      next();
    }
    res.status(200).json(savedRoom);
  } catch (error) {
    next();
  }
};
export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Rooms.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    next();
  }
};
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Rooms.findByIdAndDelete(req.params.id);
    try {
      await Hotels.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("room has been deleted.");
  } catch (error) {
    next(error);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Rooms.findById(req.params.id);

    res.status(200).json(room);
  } catch (error) {}
};
export const getRooms = async (req, res, next) => {
  try {
    const rooms = await Rooms.find(req.body);
    res.status(200).json(rooms);
  } catch (error) {
    next();
  }
};
