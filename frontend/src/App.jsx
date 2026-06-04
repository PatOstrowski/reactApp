import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WcagHelper from "./components/WcagHelper";
import CookiePolicy from "./components/CookiePolicy";
import DealList from "./components/DealList";
import CatFact from "./components/CatFact";

function App() {
  return (
    <>
      <WcagHelper />
      <Header />

      <main>
        <div id="main" className="container">
          {/* Dodatkowy wymóg z zadania - otwarte API */}
          <CatFact />
          <hr className="my-5" />
          {/* Główna lista okazji */}
          <DealList />
        </div>
      </main>

      <Footer />
      <CookiePolicy />
    </>
  );
}

export default App;
