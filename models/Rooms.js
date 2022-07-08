import express from "express";
import mongoose from "mongoose";

const { Schema } = mongoose;
const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },

    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true },
  [
    //  {number:101,unavailableDates:[30.06.2022,02.07.2022]}
    //  {number:102,unavailableDates:[30.06.2022, 02.07.2022]}
    //  {number:103,unavailableDates:[]}
    //  {number:104,unavailableDates:[]}
  ]
);
export default mongoose.model("Rooms", roomSchema);
