import { createdError } from "../utils/Error.js";
import Hotels from "../models/Hotels.js";

// THE CRUD ACTIONS

// CREATE
export const createHotel = async (req, res, next) => {
  const newHotel = new Hotels(req.body);
  try {
    const savedHotel = await newHotel.save();

    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
// UPDATE
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
};
// DELETE
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotels.findByIdAndDelete(req.params.id);

    res.status(200).json("The hotel has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};
// GET
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotels.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};
// GET ALL
export const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotels.find();
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotels.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};
