import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WcagHelper from "./components/WcagHelper";
import CookiePolicy from "./components/CookiePolicy";
import DealList from "./components/DealList";
import DealDetails from "./components/DealDetails";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <Router>
      <WcagHelper />
      <Header />

      <main>
        <div id="main" className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/deals" element={<DealList />} />
            <Route path="/deals/:id" element={<DealDetails />} />

            {/* Tutaj w przyszłości dodamy logowanie i sugestie okazji */}
            <Route
              path="*"
              element={<h2 className="text-center mt-5">Strona w budowie</h2>}
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
