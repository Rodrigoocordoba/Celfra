"""
CelFra Perfumes — Database Configuration
Supports SQLite (local dev) and PostgreSQL (production via DATABASE_URL).
"""

import os
from sqlmodel import SQLModel, create_engine, Session

# ---------------------------------------------------------------------------
# Database URL — defaults to SQLite for local dev
# Set DATABASE_URL env var to a PostgreSQL connection string for production
# ---------------------------------------------------------------------------
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./celfra.db")

# Render/Supabase/Neon may use "postgres://" which SQLAlchemy needs as "postgresql://"
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# SQLite requires check_same_thread=False for FastAPI
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, echo=False, connect_args=connect_args)


def create_db_and_tables():
    """Create all tables if they don't exist."""
    SQLModel.metadata.create_all(engine)


def get_session():
    """Dependency that provides a database session."""
    with Session(engine) as session:
        yield session
