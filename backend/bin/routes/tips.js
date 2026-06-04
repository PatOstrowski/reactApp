const express = require("express");
const router = express.Router();
const Tip = require("../models/Tip");
const Deal = require("../models/Deal"); // Importujemy model Deal!

// Middleware sprawdzające czy użytkownik jest zalogowany
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.redirect("/tips");
};

// 1. WIDOK GŁÓWNY (Dla wszystkich)
router.get("/", async (req, res) => {
  try {
    if (req.session.user) {
      const tips = await Tip.find().sort({ createdAt: -1 });
      res.render("tips/index", { tips, title: "Sugestie Okazji" });
    } else {
      res.render("tips/index", { tips: [], title: "Zgłoś Okazję" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Błąd serwera");
  }
});

// 2. DODAWANIE SUGESTII (Dla niezalogowanych)
router.post("/", async (req, res) => {
  try {
    const { url, description, email } = req.body;
    await Tip.create({ url, description, email });
    res.redirect("/tips?success=true");
  } catch (error) {
    console.error(error);
    res.redirect("/tips?error=true");
  }
});

// 3. SZCZEGÓŁY SUGESTII (Tylko zalogowani)
router.get("/:id", isLoggedIn, async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.redirect("/tips");
    res.render("tips/show", { tip, title: "Szczegóły Sugestii" });
  } catch (error) {
    res.redirect("/tips");
  }
});

// 4. ZATWIERDZENIE SUGESTII I UTWORZENIE DEALA (Tylko zalogowani)
router.post("/:id/approve", isLoggedIn, async (req, res) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    // 1. Tworzymy nowy Deal na podstawie danych z formularza
    await Deal.create({
      title,
      description,
      imageUrl,
      category,
      score: 0,
    });

    // 2. Aktualizujemy status sugestii na "przetworzona"
    await Tip.findByIdAndUpdate(req.params.id, { status: "przetworzona" });

    // 3. Przekierowujemy na listę główną
    res.redirect("/deals");
  } catch (error) {
    console.error(error);
    res.redirect("/tips");
  }
});

// 5. USUWANIE (Tylko zalogowani)
router.post("/:id/delete", isLoggedIn, async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.redirect("/tips");
  } catch (error) {
    res.redirect("/tips");
  }
});

module.exports = router;
