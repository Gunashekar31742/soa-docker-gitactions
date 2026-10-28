# Bookstore CRUD REST API

Fields from the supplied screenshot:
- `id`: Long, auto-generated
- `storeName`: String
- `location`: String
- `phone`: String
- `open`: Boolean

## Run
Requires Java 21 and Maven. From this folder run `mvn spring-boot:run`.
Base URL: `http://localhost:8086`

## Endpoints
- `POST /bookstores` — add a bookstore
- `GET /bookstores` — list all bookstores
- `GET /bookstores/{id}` — get one bookstore
- `PUT /bookstores/{id}` — update a bookstore
- `DELETE /bookstores/{id}` — delete a bookstore

POST example (do not send id):
```json
{"storeName":"Campus Bookstore","location":"Vijayawada","phone":"9876543210","open":true}
```

## Database
The backend uses PostgreSQL, not an in-memory cache. Start PostgreSQL and create a database named `bookstoredb` before starting the application. Set `SPRING_DATASOURCE_PASSWORD` in your environment to your local PostgreSQL password; the connection URL and username are configured in `src/main/resources/application.properties`. Never commit database passwords. Hibernate updates the schema automatically and bookstore records remain in PostgreSQL when the application restarts.
