# Projekt Zaliczeniowy: Fullstack Deals & Tips App

Nowoczesna aplikacja internetowa typu Single Page Application (SPA) pozwalająca użytkownikom na dzielenie się okazjami (Deals) oraz zgłaszanie propozycji nowych okazji (Tips). Projekt oparty o architekturę klient-serwer.

## Technologie

Projekt został podzielony na dwie niezależne części:

Frontend:

- React 18 (inicjalizowany przez Vite)
- React Router DOM (nawigacja bez przeładowywania strony)
- Bootstrap 5 (responsywny interfejs użytkownika)
- Fetch API (komunikacja z serwerem)

Backend:

- Node.js & Express.js (REST API)
- MongoDB & Mongoose (baza danych)
- express-session (autoryzacja i zarządzanie sesją oparte na ciasteczkach)
- CORS (bezpieczna komunikacja między portami)

## Główne funkcjonalności

- System autoryzacji: Rejestracja, logowanie i wylogowywanie użytkowników z zachowaniem sesji.
- Okazje (Deals): Przeglądanie listy okazji, system oceniania (głosowanie + / -) oraz dodawanie i czytanie komentarzy (wymaga logowania).
- Sugestie (Tips):
  - Dla gości: Możliwość zgłoszenia nowej okazji poprzez formularz z walidacją URL.
  - Dla zalogowanych (Admin): Przeglądanie tabeli zgłoszeń, usuwanie ich oraz przekształcanie (zatwierdzanie) w pełnoprawne Okazje.
- Integracja API: Wykorzystanie zewnętrznego, darmowego API na stronie głównej (np. Cat Facts).
- Zgodność z WCAG: Narzędzia wspomagające dostępność oraz polityka plików cookies.

## Uruchomienie projektu lokalnie

Aby uruchomić projekt na swoim komputerze, upewnij się, że masz zainstalowane środowisko Node.js oraz działający serwer MongoDB (lokalnie na porcie domyślnym 27017).

### 1. Uruchomienie Backendu (API)

Otwórz terminal, przejdź do folderu backend i wykonaj poniższe komendy:

cd backend
npm install
npm start

Serwer uruchomi się pod adresem: http://localhost:3000

### 2. Uruchomienie Frontendu (React)

Otwórz nową kartę terminala, przejdź do folderu frontend i wykonaj:

cd frontend
npm install
npm run dev

Aplikacja kliencka uruchomi się pod adresem: http://localhost:5173

## Użytkowanie

1. Wejdź na adres http://localhost:5173 w swojej przeglądarce.
2. Aby przetestować pełną funkcjonalność (komentarze, głosowanie, panel "Sugestie Okazji"), przejdź do zakładki Register i stwórz nowe konto.
3. System automatycznie zaloguje Cię po rejestracji, odblokowując uprawnienia administratora na stronie "Sugestie Okazji".
