import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function DealDetails() {
  const { id } = useParams(); // Pobiera ID z paska adresu
  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/deals/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setDeal(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Błąd pobierania szczegółów:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="text-center mt-5">
        <h3>Nie znaleziono okazji.</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Wróć na stronę główną
        </Link>
      </div>
    );
  }

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-8">
        <div
          className={`card shadow-sm mb-4 ${deal.score > 10 ? "border-danger" : deal.score < -10 ? "border-info" : ""}`}
        >
          {deal.imageUrl && (
            <img
              src={deal.imageUrl}
              className="card-img-top"
              alt={deal.title}
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <h2 className="card-title">{deal.title}</h2>
              <div>
                {deal.score > 10 ? (
                  <span className="badge bg-danger fs-5">Hot 🔥</span>
                ) : deal.score < -10 ? (
                  <span className="badge bg-info text-dark fs-5">Cold ❄️</span>
                ) : (
                  <span className="badge bg-secondary fs-5">Neutral</span>
                )}
                <span className="badge bg-primary fs-5 ms-2">
                  {deal.score} pts
                </span>
              </div>
            </div>

            <h5 className="text-muted mb-3">{deal.category}</h5>
            <p className="card-text lead">{deal.description}</p>

            <hr />

            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Dodano: {new Date(deal.dateAdded).toLocaleDateString()}
              </small>
              <Link to="/" className="btn btn-outline-secondary">
                Wróć do listy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
