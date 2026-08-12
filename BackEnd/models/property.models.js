import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    id: {
    type: Number,
    unique: true,
    required: true,
    },
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["buy", "rent"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    price: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    bedrooms: {
      type: Number,
      required: true,
    },

    bathrooms: {
      type: Number,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;