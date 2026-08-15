"""
CelFra Perfumes — Backend API
FastAPI server providing categories and products for the perfumery catalog.
"""

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

app = FastAPI(
    title="CelFra Perfumes API",
    description="API del catálogo de perfumería CelFra",
    version="1.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow the Vite dev server and any localhost origin
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class Category(BaseModel):
    id: str
    name: str
    description: str
    icon: str  # emoji or icon identifier


class Product(BaseModel):
    id: int
    name: str
    brand: str
    category_id: str
    price: float
    currency: str = "ARS"
    description: str
    notes: str  # fragrance notes / product details
    image: str  # placeholder image identifier
    gender: str  # "Masculino", "Femenino", "Unisex"


# ---------------------------------------------------------------------------
# Mock Data
# ---------------------------------------------------------------------------

CATEGORIES: list[Category] = [
    Category(
        id="perfumes",
        name="Perfumes",
        description="Fragancias importadas de las mejores marcas",
        icon="✨",
    ),
    Category(
        id="belleza",
        name="Productos de Belleza",
        description="Cuidado personal y cosméticos premium",
        icon="💎",
    ),
]

PRODUCTS: list[Product] = [
    # ── Perfumes ──────────────────────────────────────────────────────────
    Product(
        id=1,
        name="9 PM",
        brand="Afnan",
        category_id="perfumes",
        price=45000,
        description="Una fragancia oriental amaderada que cautiva desde la primera aplicación. Perfecta para noches especiales.",
        notes="Canela, lavanda, vainilla, ámbar",
        image="afnan_9pm",
        gender="Masculino",
    ),
    Product(
        id=2,
        name="Hawas",
        brand="Rasasi",
        category_id="perfumes",
        price=52000,
        description="Fragancia fresca y acuática con un fondo dulce irresistible. Ideal para el día a día con un toque sofisticado.",
        notes="Manzana, bergamota, ámbar gris, almizcle",
        image="rasasi_hawas",
        gender="Masculino",
    ),
    Product(
        id=3,
        name="Club de Nuit Intense",
        brand="Armaf",
        category_id="perfumes",
        price=48000,
        description="Un clásico moderno con proyección excepcional. Elegancia y presencia en cada aplicación.",
        notes="Limón, grosellas negras, abedul, almizcle",
        image="armaf_cdni",
        gender="Masculino",
    ),
    Product(
        id=4,
        name="Voyage",
        brand="Nautica",
        category_id="perfumes",
        price=25000,
        description="Frescura marina y masculina. La fragancia perfecta para quienes buscan un aroma limpio y versátil.",
        notes="Manzana verde, menta acuática, cedro, almizcle",
        image="nautica_voyage",
        gender="Masculino",
    ),
    Product(
        id=5,
        name="Blue Seduction",
        brand="Antonio Banderas",
        category_id="perfumes",
        price=22000,
        description="Seducción en estado puro. Una fragancia fresca con carácter, pensada para el hombre moderno.",
        notes="Bergamota, menta, melocotón, almizcle",
        image="ab_blue_seduction",
        gender="Masculino",
    ),
    Product(
        id=6,
        name="La Vie Est Belle",
        brand="Lancôme",
        category_id="perfumes",
        price=68000,
        description="Un iris gourmand que celebra la felicidad. La fragancia femenina más icónica de la década.",
        notes="Iris, jazmín, praliné de naranja, pachulí",
        image="lancome_lveb",
        gender="Femenino",
    ),
    Product(
        id=7,
        name="Good Girl",
        brand="Carolina Herrera",
        category_id="perfumes",
        price=72000,
        description="Dualidad perfecta entre luz y oscuridad. Para la mujer que marca su propio camino.",
        notes="Tuberosa, jazmín sambac, cacao, tonka",
        image="ch_good_girl",
        gender="Femenino",
    ),
    Product(
        id=8,
        name="Eros",
        brand="Versace",
        category_id="perfumes",
        price=55000,
        description="El dios del amor capturado en un frasco. Potente, magnético e inolvidable.",
        notes="Menta, manzana verde, vainilla, cedro",
        image="versace_eros",
        gender="Masculino",
    ),
    # ── Productos de Belleza ─────────────────────────────────────────────
    Product(
        id=9,
        name="Sérum Facial Vitamina C",
        brand="CelFra Beauty",
        category_id="belleza",
        price=18000,
        description="Ilumina y unifica el tono de tu piel con nuestro sérum concentrado de Vitamina C al 20%.",
        notes="Vitamina C, ácido hialurónico, vitamina E",
        image="serum_vitc",
        gender="Unisex",
    ),
    Product(
        id=10,
        name="Crema Hidratante Premium",
        brand="CelFra Beauty",
        category_id="belleza",
        price=15000,
        description="Hidratación profunda de 24 horas con textura ligera y absorción inmediata.",
        notes="Ácido hialurónico, colágeno, aloe vera",
        image="crema_hidratante",
        gender="Unisex",
    ),
    Product(
        id=11,
        name="Aceite de Rosa Mosqueta",
        brand="CelFra Beauty",
        category_id="belleza",
        price=12000,
        description="Aceite regenerador 100% natural. Reduce cicatrices, manchas y líneas de expresión.",
        notes="Rosa mosqueta orgánica prensada en frío",
        image="aceite_rosa",
        gender="Unisex",
    ),
    Product(
        id=12,
        name="Mascarilla Capilar Keratina",
        brand="CelFra Beauty",
        category_id="belleza",
        price=14000,
        description="Restaura el brillo y la sedosidad de tu cabello con keratina hidrolizada.",
        notes="Keratina, aceite de argán, pantenol",
        image="mascarilla_keratina",
        gender="Unisex",
    ),
]


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
async def root():
    return {"message": "CelFra Perfumes API", "version": "1.0.0"}


@app.get("/api/categories", response_model=list[Category])
async def get_categories():
    """Retorna todas las categorías disponibles."""
    return CATEGORIES


@app.get("/api/products", response_model=list[Product])
async def get_products(category: Optional[str] = Query(None, description="Filtrar por ID de categoría")):
    """Retorna la lista de productos. Opcionalmente filtra por categoría."""
    if category:
        return [p for p in PRODUCTS if p.category_id == category]
    return PRODUCTS
