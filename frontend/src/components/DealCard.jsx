import { Link } from "react-router-dom";

export default function DealCard({ deal, handleVote }) {
  const fallbackImage = "https://placehold.co/600x400/png?text=Brak+Zdjecia";

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <Link
          to={`/deals/${deal._id}`}
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
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <rect width="100%" height="100%" fill="#55595c"></rect>
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
        </Link>

        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5
              className="card-title text-truncate"
              style={{ maxWidth: "70%" }}
            >
              <Link
                to={`/deals/${deal._id}`}
                className="text-decoration-none text-dark"
              >
                {deal.title}
              </Link>
            </h5>
            <span className="badge bg-primary">{deal.category}</span>
          </div>

          <div className="mb-3">
            {deal.score > 10 ? (
              <span className="badge rounded-pill bg-danger">Hot 🔥</span>
            ) : deal.score < -10 ? (
              <span className="badge rounded-pill bg-info text-dark">
                Cold ❄️
              </span>
            ) : (
              <span className="badge rounded-pill bg-secondary">Neutral</span>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div className="btn-group" role="group" aria-label="Vote">
              {/* Przycisk Minus */}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-start"
                onClick={() => handleVote(deal._id, "downvote")}
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

              {/* Przycisk Plus */}
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary rounded-end"
                onClick={() => handleVote(deal._id, "upvote")}
              >
                <i className="bi bi-plus-lg">+</i>
              </button>
            </div>

            <Link to={`/deals/${deal._id}`} className="btn btn-sm btn-primary">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
