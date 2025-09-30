# MT01 Backend

## Structure
- `project/server.js` – entry point
- `project/routes/` – API routes
- `project/controllers/` – request handlers
- `project/services/` – business logic
- `project/models/` – Mongoose schemas
- `project/validators/` – input validation
- `project/config/db.js` – Mongo connection

## Setup
1. Create `.env` in project root:
```
PORT=3000
MONGODB_URI=mongodb+srv://USER:PASS@CLUSTER/dbname
```
2. Install deps:
```
npm install
```
3. Run:
```
npm run dev
```

## Routes
- POST `/students` { name, email, age }
- GET `/students`
- GET `/students/:id`
- PUT `/students/:id` { name, email, age }
- DELETE `/students/:id`

## Deploy (Render)
- Add env var `MONGODB_URI` under Environment.
- Render uses `npm start` and Node 18. `render.yaml` included.


