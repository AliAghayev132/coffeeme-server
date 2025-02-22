// Packages
import express from "express";
import mongoose from "mongoose";

// Mongoose
const Model = mongoose.model;
const Schema = mongoose.Schema;
// Express
const Router = () => express.Router();



export { Schema, Model, Router };