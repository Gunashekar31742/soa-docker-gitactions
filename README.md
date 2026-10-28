# Bookstore Full-Stack Application

React/Vite frontend and Spring Boot backend for managing bookstore records, with PostgreSQL persistence and Docker Compose support.

## Repository layout

- `frontend/` — React + Vite application and its Dockerfile
- `backend/` — Spring Boot REST API and its Dockerfile
- `docker-compose.yml` — frontend, backend, and persistent PostgreSQL database
- `.github/workflows/docker-publish.yml` — builds both Docker images and publishes them when Docker Hub credentials are configured

## Run with Docker Compose

Install Docker Desktop, then from the repository root run:

```powershell
Copy-Item .env.example .env
docker compose up --build
```

Open the frontend at <http://localhost:5173>. The Docker backend API is at <http://localhost:8087/bookstores> (host port 8087 maps to container port 8086). PostgreSQL data is stored in the `postgres-data` Docker volume and survives container restarts.

To stop the containers while preserving database data:

```powershell
docker compose down
```

Do not add `-v` when stopping if you want to keep the database volume.

## Run locally

Start PostgreSQL and create the database/user specified by `backend/src/main/resources/application.properties`. Set `SPRING_DATASOURCE_PASSWORD` in the environment where the backend runs. Start the backend from `backend/` with `mvn spring-boot:run`, then start the frontend from `frontend/` with `npm ci` and `npm run dev`. The frontend's default API URL is `http://localhost:8086/bookstores`; set `VITE_API_URL` in a frontend `.env` file to override it.

## GitHub Actions / Docker Hub

The workflow builds:

- `gunashekar31742/docker-backend-2400031742:latest`
- `gunashekar31742/docker-frontend-2400031742:latest`

To publish the images, add these repository secrets under **Settings → Secrets and variables → Actions**:

- `DOCKERHUB_USERNAME` — `gunashekar31742`
- `DOCKERHUB_TOKEN` — a Docker Hub access token (do not commit it)

Without both secrets the workflow still builds both images but does not publish them.
