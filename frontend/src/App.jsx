import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WcagHelper from "./components/WcagHelper";
import CookiePolicy from "./components/CookiePolicy";
import DealList from "./components/DealList";
import CatFact from "./components/CatFact";
import DealDetails from "./components/DealDetails";

function App() {
  return (
    <Router>
      <WcagHelper />
      <Header />

      <main>
        <div id="main" className="container">
          <Routes>
            {/* Strona główna z ciekawostką i listą okazji */}
            <Route
              path="/"
              element={
                <>
                  <CatFact />
                  <hr className="my-5" />
                  <DealList />
                </>
              }
            />

            {/* Podstrona ze szczegółami konkretnej okazji */}
            <Route path="/deals/:id" element={<DealDetails />} />
          </Routes>
        </div>
      </main>

      <Footer />
      <CookiePolicy />
    </Router>
  );
}

export default App;
