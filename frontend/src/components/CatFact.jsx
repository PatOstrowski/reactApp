import { useState, useEffect } from "react";

export default function CatFact() {
  const [fact, setFact] = useState("");

  useEffect(() => {
    fetch("https://catfact.ninja/fact")
      .then((res) => res.json())
      .then((data) => setFact(data.fact))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="alert alert-info mt-4">
      <strong>Losowy fakt o kotach (Otwarte API):</strong>{" "}
      {fact || "Ładowanie ciekawostki..."}
    </div>
  );
}
