const mongoose = require("mongoose");

const tpoJobSchema = new mongoose.Schema(
    {
        tpoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TPO",
            required: true,
        },
        collegeName: {
            type: String,
            required: true,
            index: true,
        },
        companyName: {
            type: String,
            required: true,
            trim: true,
        },
        jobTitle: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        interviewDate: {
            type: Date,
            required: true,
        },
        targetBranches: {
            type: [String], // e.g., ["CSE", "IT", "ECE"] or ["All"]
            default: ["All"],
        },
        applyLink: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("TPOJob", tpoJobSchema);
