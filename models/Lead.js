import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 160 },
    phone: { type: String, trim: true, maxlength: 40, default: "" },
    company: { type: String, trim: true, maxlength: 160, default: "" },
    type: { type: String, enum: ["general", "employer"], default: "general" },
    interest: { type: String, trim: true, maxlength: 160, default: "" },
    message: { type: String, required: true, trim: true, maxlength: 4000 },
    status: { type: String, enum: ["new", "contacted", "qualified", "closed"], default: "new" },
    notes: { type: String, trim: true, maxlength: 4000, default: "" },
  },
  { timestamps: true }
);

LeadSchema.index({ createdAt: -1 });
LeadSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
