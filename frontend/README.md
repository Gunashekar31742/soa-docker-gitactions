# Bookstore Full-Stack CRUD Project

This archive includes `BookstoreBackend` (Spring Boot REST API) and `BookstoreFrontend` (React + Vite + Bootstrap).

## Entity fields
- `id`: Long, auto-generated
- `storeName`: String
- `location`: String
- `phone`: String
- `open`: Boolean

## Run backend
Open the `BookstoreBackend` folder and run:
```bash
mvn spring-boot:run
```
Backend base URL: `http://localhost:8086/bookstores`

## Run frontend
Open a second terminal in `BookstoreFrontend` and run:
```bash
npm install
npm run dev
```
Open the Vite URL shown in the terminal, normally `http://localhost:5173`.

The frontend calls `http://localhost:8086/bookstores` by default. The backend and its PostgreSQL database must be running. If your environment uses a different API URL, create `.env` based on `.env.example` and set `VITE_API_URL`.

## Features
- Add, display, update, and delete bookstore records
- Auto-generated ID (no ID input on the form)
- Search records
- Form validation and success/error feedback
- Responsive layout
