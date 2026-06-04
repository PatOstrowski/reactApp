const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");

router.get("/api/list", async (req, res) => {
  try {
    const deals = await Deal.find({});
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const deals = await Deal.find({});
    res.render("deals/index", {
      title: "Deals",
      deals,
      layout: "./Layouts/layout",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.get("/api/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.json(deal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/api/:id/upvote", async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      { $inc: { score: 1 } },
      { new: true },
    );
    res.json(deal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

router.post("/api/:id/downvote", async (req, res) => {
  try {
    const deal = await Deal.findByIdAndUpdate(
      req.params.id,
      { $inc: { score: -1 } },
      { new: true },
    );
    res.json(deal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
