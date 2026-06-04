import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WcagHelper from "./components/WcagHelper";
import CookiePolicy from "./components/CookiePolicy";
import DealList from "./components/DealList";
import DealDetails from "./components/DealDetails";
import Home from "./components/Home";
import About from "./components/About";
import Tips from "./components/Tips";
import TipDetails from "./components/TipDetails";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  // Najprostsze rozwiązanie: ładujemy użytkownika z localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <Router>
      <WcagHelper />
      <Header user={user} setUser={setUser} />

      <main>
        <div id="main" className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/deals" element={<DealList />} />
            <Route path="/deals/:id" element={<DealDetails />} />

            <Route path="/tips" element={<Tips user={user} />} />
            <Route path="/tips/:id" element={<TipDetails />} />

            <Route path="/auth/login" element={<Login setUser={setUser} />} />
            <Route
              path="/auth/register"
              element={<Register setUser={setUser} />}
            />

            <Route
              path="*"
              element={
                <h2 className="text-center mt-5">404 - Nie znaleziono</h2>
              }
            />
          </Routes>
        </div>
      </main>

      <Footer />
      <CookiePolicy />
    </Router>
  );
}

export default App;
