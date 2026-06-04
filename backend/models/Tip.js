const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
  url: {
    type: String,
    required: [true, "URL jest wymagany"],
    match: [
      /^https?:\/\/.+/,
      "Podaj poprawny format URL (z http:// lub https://)",
    ],
  },
  description: {
    type: String,
    required: [true, "Opis jest wymagany"],
    maxlength: [500, "Opis nie może przekraczać 500 znaków"],
  },
  email: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["nowa", "przetworzona", "odrzucona"],
    default: "nowa",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tip", tipSchema);
