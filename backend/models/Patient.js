const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Patient name is required"],
            trim: true,
        },

        age: {
            type: Number,
            required: [true, "Age is required"],
            min: [0, "Age cannot be negative"],
        },

        gender: {
            type: String,
            required: [true, "Gender is required"],
            enum: ["Male", "Female", "Other"],
        },

        // ✅ Added — was missing, frontend sends this
        mobile: {
            type: String,
            required: [true, "Patient ID is required"],
            trim: true,
        },

        ast: {
            type: Number,
            required: [true, "AST level is required"],
            min: [0, "AST cannot be negative"],
        },

        // ✅ Added — controller was hardcoding 40, now uses actual lab value
        astLimit: {
            type: Number,
            required: [true, "AST upper limit is required"],
            min: [0, "AST limit cannot be negative"],
        },

        platelets: {
            type: Number,
            required: [true, "Platelet count is required"],
            min: [0, "Platelets cannot be negative"],
        },

        apri: {
            type: Number,
            required: true,
        },

        interpretation: {
            type: String,
            enum: [
                "Minimal or No Fibrosis",
                "Moderate Fibrosis",
                "Severe Fibrosis / Cirrhosis",
            ],
        },
    },
    {
        // ✅ Use built-in timestamps instead of manual createdAt field
        timestamps: true,
    }
);

module.exports = mongoose.model("Patient", patientSchema);