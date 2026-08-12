import mongoose from "mongoose";
import Property from "../models/property.models.js";

// POST Property
export const addProperty = async (req, res) => {
  try {
     const property = await Property.create({
      ...req.body,
      id: Date.now(),
    });

    res.status(201).json({
      success: true,
      message: "Property Posted Successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Buy Properties
export const getBuyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      category: "buy",
    });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Rent Properties
export const getRentProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      category: "rent",
    });

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findOne({
      id: Number(req.params.id),
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET All Properties
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    console.log("TOTAL PROPERTIES:", properties.length);

    res.status(200).json(properties);
  } catch (error) {
    console.error("GET PROPERTIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Property

export const deleteProperty = async (req, res) => {
  try {
    const propertyId = Number(req.params.id);

    console.log("Delete ID:", req.params.id);
    console.log("Converted ID:", propertyId);

    if (Number.isNaN(propertyId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid property ID",
      });
    }

    const property = await Property.findOneAndDelete({
      id: propertyId,
    });

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Property deleted successfully",
    });

  } catch (error) {
    console.error("DELETE PROPERTY ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

