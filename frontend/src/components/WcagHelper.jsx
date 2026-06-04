import { useEffect } from "react";

export default function WcagHelper() {
  const setCookie = (cname, cvalue, exdays) => {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
  };

  const getCookie = (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  const setHtmlClass = () => {
    const colorCookie = getCookie("colortheme") || "color-normal";
    const sizeCookie = getCookie("sizetheme") || "font-normal";
    const appClass = sizeCookie + " " + colorCookie;
    document.documentElement.className = appClass;
    const mainEl = document.getElementById("main");
    if (mainEl) mainEl.className = `container ${appClass}`;
  };

  const setSizeCookie = (size) => {
    setCookie("sizetheme", size, 30);
    setHtmlClass();
  };

  const setColorCookie = (color) => {
    setCookie("colortheme", color, 30);
    setHtmlClass();
  };

  useEffect(() => {
    setHtmlClass();
  }, []);

  return (
    <div
      className="site-divider px-3"
      style={{ paddingTop: ".7rem", paddingBottom: ".7rem" }}
    >
      <div
        className="page-options font-normal color-normal"
        aria-label="Zmiana wielkości czcionki:"
        id="page-options"
      >
        <button
          className="font-normal"
          onClick={() => setSizeCookie("font-normal")}
          data-placement="right"
          title="Zmień wielkość czcionki na normalną"
          aria-label="Zmień wielkość czcionki na normalną"
        >
          A
        </button>
        <button
          className="font-bigger"
          onClick={() => setSizeCookie("font-bigger")}
          data-placement="right"
          title="Zmień wielkość czcionki na większą"
          aria-label="Zmień wielkość czcionki na większą"
        >
          A
        </button>
        <button
          className="font-biggest"
          onClick={() => setSizeCookie("font-biggest")}
          data-placement="right"
          title="Zmień wielkość czcionki na dużą"
          aria-label="Zmień wielkość czcionki na dużą"
        >
          A
        </button>
        <button
          className="change-version contrast-one contrast-version"
          onClick={() => setColorCookie("color-normal")}
          data-placement="right"
          title="kontrast domyślny"
          aria-label="kontrast domyślny"
        >
          A
        </button>
        <button
          className="change-version contrast-two contrast-version"
          onClick={() => setColorCookie("color-contrast")}
          data-placement="right"
          title="kontrast czarno-biały"
          aria-label="kontrast czarno-biały"
        >
          A
        </button>
      </div>
    </div>
  );
}
