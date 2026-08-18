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
    version="2.0.0",
)

# ---------------------------------------------------------------------------
# CORS — allow all origins (prototype stage)
# ---------------------------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------

class Subcategory(BaseModel):
    id: str
    name: str


class Category(BaseModel):
    id: str
    name: str
    description: str
    icon: str
    subcategories: list[Subcategory] = []


class Product(BaseModel):
    id: Optional[int] = None
    name: str
    brand: str
    category_id: str       # top-level: "perfumes", "belleza", "combos"
    subcategory_id: str     # e.g. "arabes", "body_splash"
    size: str = ""          # e.g. "100 ml"
    description: str
    notes: str
    image: str
    gender: str             # "Masculino", "Femenino", "Unisex"


import json
import os
from fastapi import HTTPException

# ---------------------------------------------------------------------------
# Storage Configuration
# ---------------------------------------------------------------------------
DATA_FILE = "data.json"

# Categorías predeterminadas (éstas las mantendremos en código por ahora, ya que no piden CRUD de categorías)
CATEGORIES: list[Category] = [
    Category(
        id="perfumes",
        name="Perfumes",
        description="Fragancias importadas de las mejores marcas",
        icon="✨",
        subcategories=[
            Subcategory(id="disenador", name="Diseñador"),
            Subcategory(id="arabes", name="Árabes"),
            Subcategory(id="imitaciones", name="Imitaciones"),
        ],
    ),
    Category(
        id="belleza",
        name="Productos de Belleza",
        description="Cuidado personal y cosméticos premium",
        icon="💎",
        subcategories=[
            Subcategory(id="body_splash", name="Body Splash"),
            Subcategory(id="makeup", name="Makeup"),
            Subcategory(id="skincare", name="Skincare"),
        ],
    ),
    Category(
        id="combos",
        name="Combos",
        description="Packs y combinaciones especiales",
        icon="🎁",
        subcategories=[],
    ),
]

def load_products() -> list[dict]:
    """Carga los productos desde el archivo JSON local."""
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_products(products: list[dict]):
    """Guarda la lista de productos en el archivo JSON local."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(products, f, ensure_ascii=False, indent=2)

# ---------------------------------------------------------------------------
# Initial Data Seeding (Si el archivo no existe, lo inicializa con los 39 árabes)
# ---------------------------------------------------------------------------
if not os.path.exists(DATA_FILE):
    # Imagenes helper
    _MASC_IMAGES = ["afnan_9pm", "rasasi_hawas", "armaf_cdni", "nautica_voyage", "ab_blue_seduction", "versace_eros"]
    _FEM_IMAGES = ["lancome_lveb", "ch_good_girl"]
    def _m(i): return _MASC_IMAGES[i % len(_MASC_IMAGES)]
    def _f(i): return _FEM_IMAGES[i % len(_FEM_IMAGES)]

    # Datos iniciales (los mismos 39 perfumes árabes)
    INITIAL_PRODUCTS = [
        {"id": 1, "name": "Yeah! Man", "brand": "Maison Alhambra", "category_id": "perfumes", "subcategory_id": "arabes", "size": "125 ml", "description": "Fragancia masculina intensa con carácter. Un aroma que deja huella en cada paso.", "notes": "Notas amaderadas, especiadas, aromáticas", "image": _m(0), "gender": "Masculino"},
        {"id": 2, "name": "Salvo Intense", "brand": "Maison Alhambra", "category_id": "perfumes", "subcategory_id": "arabes", "size": "100 ml", "description": "Intensidad y elegancia en una fragancia que combina notas orientales con un fondo amaderado.", "notes": "Notas orientales, amaderadas, intensas", "image": _m(1), "gender": "Masculino"},
        {"id": 3, "name": "Salvo Elixir", "brand": "Maison Alhambra", "category_id": "perfumes", "subcategory_id": "arabes", "size": "30 ml", "description": "La versión concentrada de Salvo. Potencia y duración excepcionales en formato compacto.", "notes": "Notas orientales, amaderadas, concentradas", "image": _m(2), "gender": "Masculino"},
        {"id": 4, "name": "Jean Lowe Immortal", "brand": "Maison Alhambra", "category_id": "perfumes", "subcategory_id": "arabes", "size": "30 ml", "description": "Una fragancia inmortal que fusiona frescura y profundidad. Ideal para el uso diario.", "notes": "Notas frescas, aromáticas, amaderadas", "image": _m(3), "gender": "Masculino"},
        {"id": 5, "name": "Odyssey Go Mango", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "100 ml", "description": "Una explosión tropical y frutal. Frescura exótica con un toque dulce irresistible.", "notes": "Mango, notas frutales, almizcle", "image": _m(4), "gender": "Unisex"},
        {"id": 6, "name": "Odyssey Artisto", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Sofisticación artística capturada en fragancia. Para quienes aprecian lo exclusivo.", "notes": "Notas amaderadas, aromáticas, elegantes", "image": _m(5), "gender": "Masculino"},
        {"id": 7, "name": "Odyssey Mega", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Mega proyección, mega duración. Una fragancia que no pasa desapercibida.", "notes": "Notas intensas, amaderadas, especiadas", "image": _m(0), "gender": "Masculino"},
        {"id": 8, "name": "Odyssey Aqua", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Frescura acuática premium. Como una brisa marina en un frasco de lujo.", "notes": "Notas acuáticas, cítricas, almizcle", "image": _m(1), "gender": "Masculino"},
        {"id": 9, "name": "Odyssey Mandarín Sky", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Cítricos vibrantes que evocan un cielo despejado. Energía y frescura pura.", "notes": "Mandarina, notas cítricas, amaderadas", "image": _m(2), "gender": "Masculino"},
        {"id": 10, "name": "Odyssey Mandarín Sky Elixir", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La versión elixir del Mandarín Sky. Mayor concentración y una estela imponente.", "notes": "Mandarina, notas orientales, concentradas", "image": _m(3), "gender": "Masculino"},
        {"id": 11, "name": "Odyssey Mandarín Sky Vintage", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Un clásico reimaginado. Elegancia vintage con un toque de mandarina sofisticada.", "notes": "Mandarina, notas vintage, amaderadas", "image": _m(4), "gender": "Masculino"},
        {"id": 12, "name": "Odyssey Candee", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Dulzura irresistible con personalidad. Una fragancia golosa y envolvente.", "notes": "Notas dulces, gourmand, vainilla", "image": _f(0), "gender": "Femenino"},
        {"id": 13, "name": "Odyssey Spectra", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Un espectro de notas que sorprende. Versatilidad y carácter en cada aplicación.", "notes": "Notas aromáticas, especiadas, amaderadas", "image": _m(5), "gender": "Masculino"},
        {"id": 14, "name": "Club de Nuit Women", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Feminidad y poder en una fragancia nocturna. Para la mujer que brilla de noche.", "notes": "Notas florales, frutales, almizcle", "image": _f(1), "gender": "Femenino"},
        {"id": 15, "name": "Club de Nuit Iconic", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La definición de icónico. Presencia, elegancia y un sillage que enamora.", "notes": "Notas amaderadas, aromáticas, elegantes", "image": _m(0), "gender": "Masculino"},
        {"id": 16, "name": "Club de Nuit Intense Man", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Un clásico moderno con proyección excepcional. Elegancia y presencia en cada aplicación.", "notes": "Limón, grosellas negras, abedul, almizcle", "image": _m(2), "gender": "Masculino"},
        {"id": 17, "name": "Club de Nuit Urban Man Elixir", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "El hombre urbano elevado al máximo. Sofisticación moderna con concentración elixir.", "notes": "Notas urbanas, amaderadas, especiadas", "image": _m(3), "gender": "Masculino"},
        {"id": 18, "name": "Club de Nuit Sillage", "brand": "Armaf", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "El arte del sillage perfecto. Dejá tu marca en cada lugar al que vayas.", "notes": "Notas amaderadas, aromáticas, almizcle blanco", "image": _m(4), "gender": "Masculino"},
        {"id": 19, "name": "9 PM Elixir", "brand": "Afnan", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La versión más intensa del icónico 9 PM. Concentración máxima para noches inolvidables.", "notes": "Canela, lavanda, vainilla, ámbar concentrado", "image": _m(0), "gender": "Masculino"},
        {"id": 20, "name": "9 AM", "brand": "Afnan", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La contraparte matutina del 9 PM. Frescura energizante para empezar el día con todo.", "notes": "Notas cítricas, frescas, aromáticas", "image": _m(1), "gender": "Masculino"},
        {"id": 21, "name": "9 PM Black", "brand": "Afnan", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La versión más oscura y misteriosa de la línea 9 PM. Seducción pura.", "notes": "Notas oscuras, orientales, amaderadas", "image": _m(2), "gender": "Masculino"},
        {"id": 22, "name": "9 PM Night Out", "brand": "Afnan", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Diseñado para la noche perfecta. Carismático, magnético e inolvidable.", "notes": "Notas nocturnas, especiadas, dulces", "image": _m(3), "gender": "Masculino"},
        {"id": 23, "name": "9 PM Velles", "brand": "Afnan", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Una interpretación exclusiva dentro de la línea 9 PM. Refinamiento absoluto.", "notes": "Notas orientales, amaderadas, refinadas", "image": _m(4), "gender": "Masculino"},
        {"id": 24, "name": "9 AM Poitiers Femme", "brand": "Afnan", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Elegancia femenina francesa capturada en una fragancia matutina. Delicada y poderosa.", "notes": "Notas florales, frescas, elegantes", "image": _f(0), "gender": "Femenino"},
        {"id": 25, "name": "Khamrah Dukhan", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Humo y misterio en una fragancia oriental profunda. Khamrah en su versión más ahumada.", "notes": "Notas ahumadas, orientales, amaderadas", "image": _m(5), "gender": "Unisex"},
        {"id": 26, "name": "Khamrah Qawha", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Inspirado en el ritual del café árabe. Calidez gourmand con alma oriental.", "notes": "Café, notas gourmand, especias cálidas", "image": _m(0), "gender": "Unisex"},
        {"id": 27, "name": "Khamrah Clásico", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "El Khamrah original que conquistó al mundo. Dulzura oriental con profundidad inigualable.", "notes": "Notas orientales, dulces, amaderadas", "image": _m(1), "gender": "Unisex"},
        {"id": 28, "name": "Whis Confesión", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Una confesión olfativa. Misterio y seducción en cada nota de esta fragancia única.", "notes": "Notas orientales, especiadas, seductoras", "image": _m(2), "gender": "Masculino"},
        {"id": 29, "name": "Asad Negro", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "El león negro. Potencia y nobleza en una fragancia de presencia imponente.", "notes": "Notas amaderadas, especiadas, intensas", "image": _m(3), "gender": "Masculino"},
        {"id": 30, "name": "Asad Zanzíbar", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Inspirado en las especias de Zanzíbar. Exotismo y calidez en cada aplicación.", "notes": "Especias exóticas, notas cálidas, ámbar", "image": _m(4), "gender": "Masculino"},
        {"id": 31, "name": "Asad Bourbon", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La fusión perfecta entre oriente y el carácter del bourbon. Robusto y cautivador.", "notes": "Bourbon, notas amaderadas, tabaco", "image": _m(5), "gender": "Masculino"},
        {"id": 32, "name": "Yara Moi", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La esencia del 'yo' femenino. Delicada, dulce y absolutamente cautivadora.", "notes": "Notas florales, dulces, gourmand", "image": _f(0), "gender": "Femenino"},
        {"id": 33, "name": "Yara Tous", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Yara para todos los momentos. Versatilidad y encanto femenino sin límites.", "notes": "Notas florales, frutales, almizcle", "image": _f(1), "gender": "Femenino"},
        {"id": 34, "name": "Yara Elixir", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La concentración máxima de Yara. Profundidad y duración para la mujer exigente.", "notes": "Notas florales, orientales, concentradas", "image": _f(0), "gender": "Femenino"},
        {"id": 35, "name": "Yara Candy", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Dulzura irresistible en su máxima expresión. Como un caramelo de lujo hecho fragancia.", "notes": "Notas dulces, gourmand, vainilla, caramelo", "image": _f(1), "gender": "Femenino"},
        {"id": 36, "name": "Yara Women", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La fragancia insignia de la línea Yara. Feminidad oriental en estado puro.", "notes": "Notas florales, orientales, almizcle", "image": _f(0), "gender": "Femenino"},
        {"id": 37, "name": "Fakhar Negro", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "Orgullo en su forma más oscura y elegante. Una fragancia que inspira respeto.", "notes": "Notas amaderadas, especiadas, oscuras", "image": _m(0), "gender": "Masculino"},
        {"id": 38, "name": "Fakhar Rosa", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La versión rosada de Fakhar. Fuerza femenina con un toque floral sofisticado.", "notes": "Rosa, notas florales, almizcle", "image": _f(1), "gender": "Femenino"},
        {"id": 39, "name": "Fakhar Gold", "brand": "Lattafa", "category_id": "perfumes", "subcategory_id": "arabes", "size": "", "description": "La corona de la línea Fakhar. Opulencia dorada en una fragancia de alto impacto.", "notes": "Notas orientales, amaderadas, oud dorado", "image": _m(5), "gender": "Unisex"},
    ]
    save_products(INITIAL_PRODUCTS)


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@app.get("/")
async def root():
    return {"message": "CelFra Perfumes API", "version": "2.0.0"}


@app.get("/api/categories", response_model=list[Category])
async def get_categories():
    """Retorna todas las categorías con sus subcategorías."""
    return CATEGORIES


@app.get("/api/products", response_model=list[Product])
async def get_products(
    category: Optional[str] = Query(None, description="Filtrar por categoría principal"),
    subcategory: Optional[str] = Query(None, description="Filtrar por subcategoría"),
):
    """Retorna la lista de productos. Filtra por categoría y/o subcategoría."""
    products_db = load_products()
    # Convert to Product models for response validation
    result = [Product(**p) for p in products_db]
    
    if category:
        result = [p for p in result if p.category_id == category]
    if subcategory:
        result = [p for p in result if p.subcategory_id == subcategory]
    return result


@app.post("/api/products", response_model=Product)
async def create_product(product: Product):
    """Crea un nuevo producto en la base de datos JSON."""
    products_db = load_products()
    
    # Generate new ID
    new_id = 1
    if products_db:
        new_id = max(p["id"] for p in products_db) + 1
        
    product.id = new_id
    products_db.append(product.model_dump())
    save_products(products_db)
    
    return product


@app.put("/api/products/{product_id}", response_model=Product)
async def update_product(product_id: int, updated_product: Product):
    """Actualiza un producto existente en la base de datos JSON."""
    products_db = load_products()
    
    for i, p in enumerate(products_db):
        if p["id"] == product_id:
            updated_product.id = product_id
            products_db[i] = updated_product.model_dump()
            save_products(products_db)
            return updated_product
            
    raise HTTPException(status_code=404, detail="Producto no encontrado")


@app.delete("/api/products/{product_id}")
async def delete_product(product_id: int):
    """Elimina un producto de la base de datos JSON."""
    products_db = load_products()
    
    filtered_db = [p for p in products_db if p["id"] != product_id]
    
    if len(filtered_db) == len(products_db):
        raise HTTPException(status_code=404, detail="Producto no encontrado")
        
    save_products(filtered_db)
    return {"message": "Producto eliminado exitosamente"}
