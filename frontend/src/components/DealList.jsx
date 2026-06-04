import { useState, useEffect } from "react";
import DealCard from "./DealCard";

export default function DealList() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const handleVote = async (dealId, type) => {
    try {
      const response = await fetch(
        `http://localhost:3000/deals/api/${dealId}/${type}`,
        {
          method: "POST",
        },
      );

      if (response.ok) {
        const updatedDeal = await response.json();
        setDeals(
          deals.map((deal) => (deal._id === dealId ? updatedDeal : deal)),
        );
      }
    } catch (error) {
      console.error("Błąd podczas głosowania:", error);
    }
  };

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
                <DealCard key={deal._id} deal={deal} handleVote={handleVote} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
