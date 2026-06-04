import React, { useState, useEffect } from "react";

export default function DealList() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Uwaga: Pamiętaj o uruchomieniu swojego backendu na porcie 3000 i dodaniu do niego CORS!
    fetch("http://localhost:3000/deals/api/list")
      .then((response) => response.json())
      .then((data) => {
        setDeals(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching deals:", error);
        setLoading(false);
      });
  }, []);

  const fallbackImage = "https://placehold.co/600x400/png?text=Brak+Zdjecia";

  return (
    <div className="album py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Deals (Fetch API - React)</h1>
      </div>

      {loading && (
        <div id="loading" className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && deals.length === 0 && (
        <div id="no-deals" className="text-center">
          <p>No deals found.</p>
        </div>
      )}

      {!loading && deals.length > 0 && (
        <div id="deals-container" className="album py-3 bg-light">
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {deals.map((deal) => (
                <div className="col" key={deal._id}>
                  <div className="card shadow-sm h-100">
                    <a
                      href={`/deals/${deal._id}`}
                      className="text-decoration-none text-dark"
                    >
                      {deal.imageUrl ? (
                        <img
                          src={deal.imageUrl}
                          className="card-img-top"
                          width="100%"
                          height="225"
                          style={{ objectFit: "cover" }}
                          alt={deal.title}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                          }}
                        />
                      ) : (
                        <svg
                          className="bd-placeholder-img card-img-top"
                          width="100%"
                          height="225"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-label="Placeholder: Thumbnail"
                          preserveAspectRatio="xMidYMid slice"
                          focusable="false"
                        >
                          <title>Placeholder</title>
                          <rect
                            width="100%"
                            height="100%"
                            fill="#55595c"
                          ></rect>
                          <text
                            x="50%"
                            y="50%"
                            fill="#eceeef"
                            dy=".3em"
                            textAnchor="middle"
                          >
                            {deal.category}
                          </text>
                        </svg>
                      )}
                    </a>

                    <div className="card-body d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5
                          className="card-title text-truncate"
                          style={{ maxWidth: "70%" }}
                        >
                          <a
                            href={`/deals/${deal._id}`}
                            className="text-decoration-none text-dark"
                          >
                            {deal.title}
                          </a>
                        </h5>
                        <span className="badge bg-primary">
                          {deal.category}
                        </span>
                      </div>

                      <div className="mb-3">
                        {deal.score > 10 ? (
                          <span className="badge rounded-pill bg-danger">
                            Hot 🔥
                          </span>
                        ) : deal.score < -10 ? (
                          <span className="badge rounded-pill bg-info text-dark">
                            Cold ❄️
                          </span>
                        ) : (
                          <span className="badge rounded-pill bg-secondary">
                            Neutral
                          </span>
                        )}
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-auto">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Vote"
                        >
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary rounded-start"
                          >
                            <i className="bi bi-dash-lg">-</i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            disabled
                            style={{ minWidth: "40px" }}
                          >
                            <strong>{deal.score}</strong>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary rounded-end"
                          >
                            <i className="bi bi-plus-lg">+</i>
                          </button>
                        </div>

                        <a
                          href={`/deals/${deal._id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Details
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
