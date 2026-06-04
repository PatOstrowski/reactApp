import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Tips({ user }) {
  // Stany dla widoku admina (lista)
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Stany dla widoku gościa (formularz)
  const [formData, setFormData] = useState({
    url: "",
    description: "",
    email: "",
  });
  const [status, setStatus] = useState(null);

  // Pobieranie listy zapytań (tylko jeśli użytkownik jest zalogowany)
  useEffect(() => {
    if (user) {
      setLoading(true);

      // Dodaliśmy credentials: "include", bo ścieżka w backendzie jest chroniona przez isLoggedIn
      fetch("http://localhost:3000/tips/api/list", { credentials: "include" })
        .then((res) => {
          if (!res.ok) throw new Error("Brak dostępu lub błąd serwera");
          return res.json();
        })
        .then((data) => {
          setTips(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  // Obsługa formularza gościa
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const response = await fetch("http://localhost:3000/tips/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ url: "", description: "", email: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
      console.log(error);
    }
  };

  // Usuwanie zgłoszenia (Tylko dla zalogowanych adminów)
  const deleteTip = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć?")) return;
    try {
      const response = await fetch(
        `http://localhost:3000/tips/api/${id}/delete`,
        {
          method: "POST",
          credentials: "include", // Wymagane autoryzowanie usuwania
        },
      );
      if (response.ok) {
        setTips(tips.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      {user ? (
        // WIDOK ADMINA: TABELA
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Lista Sugestii "Tips"</h1>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Data</th>
                    <th>URL</th>
                    <th>Skrócony opis</th>
                    <th>Status</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {tips.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Brak zgłoszonych sugestii.
                      </td>
                    </tr>
                  ) : (
                    tips.map((tip) => (
                      <tr key={tip._id}>
                        <td>
                          {new Date(tip.createdAt).toLocaleDateString("pl-PL")}
                        </td>
                        <td>
                          <a href={tip.url} target="_blank" rel="noreferrer">
                            {tip.url.length > 50
                              ? tip.url.substring(0, 50) + "..."
                              : tip.url}
                          </a>
                        </td>
                        <td>
                          {tip.description.length > 100
                            ? tip.description.substring(0, 100) + "..."
                            : tip.description}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              tip.status === "nowa"
                                ? "bg-success"
                                : "bg-primary"
                            }`}
                          >
                            {tip.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/tips/${tip._id}`}
                            className="btn btn-sm btn-info text-white me-2"
                          >
                            Szczegóły
                          </Link>
                          <button
                            onClick={() => deleteTip(tip._id)}
                            className="btn btn-sm btn-danger"
                          >
                            Usuń
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        // WIDOK GOŚCIA: FORMULARZ
        <>
          {status === "success" && (
            <div className="alert alert-success">
              Twoja sugestia została pomyślnie dodana!
            </div>
          )}
          {status === "error" && (
            <div className="alert alert-danger">Wystąpił błąd.</div>
          )}

          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h4 className="mb-0">Zgłoś nową okazję (Tip)</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">
                        URL strony z okazją *
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        name="url"
                        required
                        value={formData.url}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Opis okazji * (max 500 znaków)
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        maxLength="500"
                        required
                        value={formData.description}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">
                        Twój Email (opcjonalnie)
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Prześlij sugestię
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
