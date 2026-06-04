const express = require("express");
const router = express.Router();
const Tip = require("../models/Tip");
const Deal = require("../models/Deal");

// Middleware sprawdzający sesję
const isLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  // Zamiast res.redirect zwracamy status 401 (Brak autoryzacji)
  res.status(401).json({ error: "Brak dostępu. Zaloguj się." });
};

// 1. WIDOK GŁÓWNY - Pobieranie listy (Tylko zalogowani)
router.get("/api/list", isLoggedIn, async (req, res) => {
  try {
    const tips = await Tip.find().sort({ createdAt: -1 });
    res.json(tips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// 2. DODAWANIE SUGESTII (Dostępne dla wszystkich)
router.post("/api/create", async (req, res) => {
  try {
    const { url, description, email } = req.body;
    await Tip.create({ url, description, email });
    res.status(201).json({ message: "Sugestia została pomyślnie dodana!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Wystąpił błąd podczas dodawania sugestii." });
  }
});

// 3. SZCZEGÓŁY SUGESTII (Tylko zalogowani)
router.get("/api/:id", isLoggedIn, async (req, res) => {
  try {
    const tip = await Tip.findById(req.params.id);
    if (!tip) return res.status(404).json({ error: "Nie znaleziono sugestii" });
    res.json(tip);
  } catch (error) {
    res.status(500).json({ error: "Błąd serwera" });
  }
});

// 4. ZATWIERDZENIE SUGESTII I UTWORZENIE DEALA (Tylko zalogowani)
router.post("/api/:id/approve", isLoggedIn, async (req, res) => {
  try {
    const { title, description, imageUrl, category } = req.body;

    await Deal.create({
      title,
      description,
      imageUrl,
      category,
      score: 0,
    });

    await Tip.findByIdAndUpdate(req.params.id, { status: "przetworzona" });
    res.json({ message: "Deal utworzony pomyślnie" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Błąd podczas zatwierdzania" });
  }
});

// 5. USUWANIE (Tylko zalogowani)
router.post("/api/:id/delete", isLoggedIn, async (req, res) => {
  try {
    await Tip.findByIdAndDelete(req.params.id);
    res.json({ message: "Usunięto pomyślnie" });
  } catch (error) {
    res.status(500).json({ error: "Błąd usuwania" });
  }
});

module.exports = router;
