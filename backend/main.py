"""
CelFra Perfumes — Backend API
FastAPI server providing public catalog endpoints and protected admin CRUD.
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, Query, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from database import create_db_and_tables, get_session, engine
from models import CategoryDB, SubcategoryDB, ProductDB
from seed_data import seed_database
from auth import (
    LoginRequest, TokenResponse, verify_password, create_access_token, get_current_admin
)

# ---------------------------------------------------------------------------
# App Lifespan (Startup)
# ---------------------------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Setup database tables and seed initial data
    create_db_and_tables()
    with Session(engine) as session:
        seed_database(session)
    yield


app = FastAPI(
    title="CelFra Perfumes API",
    description="API del catálogo de perfumería CelFra con Backoffice",
    version="3.0.0",
    lifespan=lifespan
)

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# API Responses Schemas (Public)
# ---------------------------------------------------------------------------

class SubcategoryOut(SubcategoryDB):
    pass

class CategoryOut(CategoryDB):
    subcategories: list[SubcategoryOut] = []


# ---------------------------------------------------------------------------
# Public Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
async def root():
    return {"message": "CelFra Perfumes API", "version": "3.0.0"}


@app.get("/api/categories", response_model=list[CategoryOut])
async def get_categories(session: Session = Depends(get_session)):
    """Retorna todas las categorías con sus subcategorías."""
    categories = session.exec(select(CategoryDB)).all()
    return categories


@app.get("/api/products", response_model=list[ProductDB])
async def get_products(
    category: str | None = Query(None, description="Filtrar por categoría principal"),
    subcategory: str | None = Query(None, description="Filtrar por subcategoría"),
    session: Session = Depends(get_session)
):
    """Retorna la lista de productos. Filtra por categoría y/o subcategoría."""
    query = select(ProductDB)
    if category:
        query = query.where(ProductDB.category_id == category)
    if subcategory:
        query = query.where(ProductDB.subcategory_id == subcategory)
    
    return session.exec(query).all()


# ---------------------------------------------------------------------------
# Admin Endpoints (Protected)
# ---------------------------------------------------------------------------

@app.post("/api/admin/login", response_model=TokenResponse)
async def admin_login(req: LoginRequest):
    """Verifica la contraseña y retorna un JWT."""
    if not verify_password(req.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Contraseña incorrecta",
        )
    access_token = create_access_token()
    return {"access_token": access_token, "token_type": "bearer"}


# ── Products CRUD ────────────────────────────────────────────────────────

@app.post("/api/admin/products", response_model=ProductDB)
async def create_product(
    product: ProductDB, 
    session: Session = Depends(get_session),
    admin: dict = Depends(get_current_admin)
):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product


@app.put("/api/admin/products/{product_id}", response_model=ProductDB)
async def update_product(
    product_id: int, 
    product_update: ProductDB, 
    session: Session = Depends(get_session),
    admin: dict = Depends(get_current_admin)
):
    db_product = session.get(ProductDB, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    product_data = product_update.model_dump(exclude_unset=True)
    for key, value in product_data.items():
        # Prevent changing ID
        if key != "id":
            setattr(db_product, key, value)
            
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product


@app.delete("/api/admin/products/{product_id}")
async def delete_product(
    product_id: int, 
    session: Session = Depends(get_session),
    admin: dict = Depends(get_current_admin)
):
    db_product = session.get(ProductDB, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    session.delete(db_product)
    session.commit()
    return {"ok": True, "message": "Producto eliminado"}

# ── Categories CRUD ──────────────────────────────────────────────────────

@app.post("/api/admin/categories", response_model=CategoryDB)
async def create_category(
    category: CategoryDB, 
    session: Session = Depends(get_session),
    admin: dict = Depends(get_current_admin)
):
    session.add(category)
    session.commit()
    session.refresh(category)
    return category

@app.delete("/api/admin/categories/{category_id}")
async def delete_category(
    category_id: str, 
    session: Session = Depends(get_session),
    admin: dict = Depends(get_current_admin)
):
    db_category = session.get(CategoryDB, category_id)
    if not db_category:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    
    session.delete(db_category)
    session.commit()
    return {"ok": True, "message": "Categoría eliminada"}
