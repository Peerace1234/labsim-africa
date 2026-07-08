LabSim backend

Quick start

1. Copy `.env.example` to `.env` and set `JWT_SECRET` and optionally `PORT` and `DB_FILE`.

2. Install dependencies:

```bash
cd server
npm install
```

3. Run the server:

```bash
npm start
```

API

- POST /api/signup { name, email, password } -> { user, token }
- POST /api/login { email, password } -> { user, token }
- GET /api/profile (Authorization: Bearer <token>) -> { user }

Note: For production, secure the `JWT_SECRET` and consider HTTPS and rate limiting.
