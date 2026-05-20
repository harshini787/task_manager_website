# FastAPI Task Manager

A simple task manager built with FastAPI, SQLAlchemy, JWT authentication, and a static frontend.

## Project structure

- `app/main.py` - FastAPI app and route registration
- `app/routers/auth_routes.py` - register/login endpoints
- `app/routers/task_routes.py` - task CRUD endpoints
- `app/database.py` - database configuration
- `app/models.py` - SQLAlchemy models for users and tasks
- `app/schemas.py` - Pydantic request/response schemas
- `app/security.py` - password hashing and JWT creation
- `app/static/` - frontend HTML/CSS/JavaScript
- `vercel.json` - Vercel deployment config
- `requirements.txt` - Python dependencies

## Local setup

1. Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Set environment variables locally:

```bash
set SECRET_KEY="your_secret_key"
set ALGORITHM="HS256"
set ACCESS_TOKEN_EXPIRE_MINUTES=60
set DATABASE_URL="sqlite:///./task_manager.db"
```

4. Run the app:

```bash
uvicorn app.main:app --reload
```

5. Open the frontend in your browser:

```text
http://127.0.0.1:8000
```

## Vercel deployment

1. Sign in to Vercel and connect your GitHub repository.
2. Ensure `vercel.json` is present in the project root.
3. Set the environment variables in Vercel:
   - `SECRET_KEY`
   - `ALGORITHM`
   - `ACCESS_TOKEN_EXPIRE_MINUTES`
   - `DATABASE_URL`

### Recommended database for Vercel
Vercel functions are serverless and do not persist SQLite files reliably. Use an external database:

- PostgreSQL
- MySQL
- Supabase

Example Vercel env var:

```text
DATABASE_URL=postgresql://user:password@host:port/dbname
```

4. Deploy with Vercel CLI:

```bash
npm install -g vercel
vercel --prod
```

## Notes

- Do not commit `.env` or `task_manager.db`.
- Use the Vercel dashboard to manage env vars and redeploy after changes.
