import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function TipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tip, setTip] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    imageUrl: "",
    description: "",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/tips/api/${id}`, { credentials: "include" })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Brak dostępu do tej zawartości.");
        }
        return data;
      })
      .then((data) => {
        setTip(data);
        setFormData({
          title: "",
          category: "",
          imageUrl: data.url,
          description: data.description,
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, [id]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleApprove = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/tips/api/${id}/approve`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
          credentials: "include",
        },
      );
      if (response.ok) {
        navigate("/deals");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Trwale usunąć ten wpis z bazy?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/tips/api/${id}/delete`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      if (response.ok) {
        navigate("/tips");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return (
      <div className="container mt-5 text-center">
        <div className="alert alert-danger">
          <h4>Błąd!</h4>
          <p>{error}</p>
        </div>
        <Link to="/tips" className="btn btn-primary">
          Wróć do listy
        </Link>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header d-flex justify-content-between align-items-center bg-dark text-white">
              <h3 className="mb-0">Szczegóły Sugestii</h3>
              <span
                className={`badge ${tip.status === "nowa" ? "bg-success" : "bg-primary"}`}
              >
                Status: {tip.status ? tip.status.toUpperCase() : "NIEZNANY"}
              </span>
            </div>

            <div className="card-body">
              <p>
                <strong>Data zgłoszenia:</strong>{" "}
                {new Date(tip.createdAt).toLocaleString("pl-PL")}
              </p>
              <p>
                <strong>Email zgłaszającego:</strong>{" "}
                {tip.email || "Brak danych"}
              </p>
              <p>
                <strong>URL Okazji:</strong>{" "}
                <a href={tip.url} target="_blank" rel="noreferrer">
                  {tip.url}
                </a>
              </p>
              <hr />

              <h4 className="mb-3 text-primary">Utwórz z tego Okazję (Deal)</h4>

              <form
                onSubmit={handleApprove}
                className="bg-light p-3 border rounded"
              >
                <div className="mb-3">
                  <label className="form-label fw-bold">Tytuł (wymagany)</label>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Wpisz krótki tytuł okazji"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Kategoria (wymagana)
                  </label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="np. Elektronika"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">
                    Link do obrazka / URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    className="form-control"
                    required
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Opis</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    required
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <Link to="/tips" className="btn btn-secondary">
                    Wróć do listy
                  </Link>
                  <button type="submit" className="btn btn-success">
                    Zatwierdź i Utwórz Deal
                  </button>
                </div>
              </form>

              <div className="text-end mt-3">
                <button
                  onClick={handleDelete}
                  className="btn btn-sm btn-outline-danger"
                >
                  Odrzuć i usuń sugestię
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
