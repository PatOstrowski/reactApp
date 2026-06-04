const express = require("express");
const router = express.Router();
const Deal = require("../models/Deal");

// GET All Deals API
router.get("/api/list", async (req, res) => {
  try {
    const deals = await Deal.find({});
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// GET All Deals
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

// GET Deal Details
router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).send("Deal not found");
    }
    res.render("deals/show", {
      title: deal.title,
      deal,
      layout: "./Layouts/layout",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST Upvote Deal
router.post("/:id/upvote", async (req, res) => {
  try {
    await Deal.findByIdAndUpdate(req.params.id, { $inc: { score: 1 } });
    res.redirect("/deals");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST Downvote Deal
router.post("/:id/downvote", async (req, res) => {
  try {
    await Deal.findByIdAndUpdate(req.params.id, { $inc: { score: -1 } });
    res.redirect("/deals");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
