"""
CelFra Perfumes — Seed Data
Initial data for categories, subcategories, and products.
Only runs when the database is empty (first deploy or fresh DB).
"""

from sqlmodel import Session, select
from models import CategoryDB, SubcategoryDB, ProductDB


def seed_database(session: Session):
    """Populate the database with initial data if tables are empty."""

    # Check if data already exists
    existing = session.exec(select(CategoryDB)).first()
    if existing:
        return  # Database already has data, skip seeding

    print("[CelFra] Seeding database with initial data...")

    # ── Categories ────────────────────────────────────────────────────────
    categories = [
        CategoryDB(id="perfumes", name="Perfumes", description="Fragancias importadas de las mejores marcas", icon="✨"),
        CategoryDB(id="belleza", name="Productos de Belleza", description="Cuidado personal y cosméticos premium", icon="💎"),
        CategoryDB(id="combos", name="Combos", description="Packs y combinaciones especiales", icon="🎁"),
    ]
    for cat in categories:
        session.add(cat)

    # ── Subcategories ─────────────────────────────────────────────────────
    subcategories = [
        SubcategoryDB(id="disenador", name="Diseñador", category_id="perfumes"),
        SubcategoryDB(id="arabes", name="Árabes", category_id="perfumes"),
        SubcategoryDB(id="imitaciones", name="Imitaciones", category_id="perfumes"),
        SubcategoryDB(id="body_splash", name="Body Splash", category_id="belleza"),
        SubcategoryDB(id="makeup", name="Makeup", category_id="belleza"),
        SubcategoryDB(id="skincare", name="Skincare", category_id="belleza"),
    ]
    for sub in subcategories:
        session.add(sub)

    # ── Image pool ────────────────────────────────────────────────────────
    _M = ["afnan_9pm", "rasasi_hawas", "armaf_cdni", "nautica_voyage", "ab_blue_seduction", "versace_eros"]
    _F = ["lancome_lveb", "ch_good_girl"]

    def m(i): return _M[i % len(_M)]
    def f(i): return _F[i % len(_F)]

    # ── Products: Perfumes Árabes ─────────────────────────────────────────
    products = [
        # MAISON ALHAMBRA
        ProductDB(name="Yeah! Man", brand="Maison Alhambra", category_id="perfumes", subcategory_id="arabes", size="125 ml", description="Fragancia masculina intensa con carácter. Un aroma que deja huella en cada paso.", notes="Notas amaderadas, especiadas, aromáticas", image=m(0), gender="Masculino"),
        ProductDB(name="Salvo Intense", brand="Maison Alhambra", category_id="perfumes", subcategory_id="arabes", size="100 ml", description="Intensidad y elegancia en una fragancia que combina notas orientales con un fondo amaderado.", notes="Notas orientales, amaderadas, intensas", image=m(1), gender="Masculino"),
        ProductDB(name="Salvo Elixir", brand="Maison Alhambra", category_id="perfumes", subcategory_id="arabes", size="30 ml", description="La versión concentrada de Salvo. Potencia y duración excepcionales en formato compacto.", notes="Notas orientales, amaderadas, concentradas", image=m(2), gender="Masculino"),
        ProductDB(name="Jean Lowe Immortal", brand="Maison Alhambra", category_id="perfumes", subcategory_id="arabes", size="30 ml", description="Una fragancia inmortal que fusiona frescura y profundidad. Ideal para el uso diario.", notes="Notas frescas, aromáticas, amaderadas", image=m(3), gender="Masculino"),

        # ARMAF
        ProductDB(name="Odyssey Go Mango", brand="Armaf", category_id="perfumes", subcategory_id="arabes", size="100 ml", description="Una explosión tropical y frutal. Frescura exótica con un toque dulce irresistible.", notes="Mango, notas frutales, almizcle", image=m(4), gender="Unisex"),
        ProductDB(name="Odyssey Artisto", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Sofisticación artística capturada en fragancia. Para quienes aprecian lo exclusivo.", notes="Notas amaderadas, aromáticas, elegantes", image=m(5), gender="Masculino"),
        ProductDB(name="Odyssey Mega", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Mega proyección, mega duración. Una fragancia que no pasa desapercibida.", notes="Notas intensas, amaderadas, especiadas", image=m(0), gender="Masculino"),
        ProductDB(name="Odyssey Aqua", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Frescura acuática premium. Como una brisa marina en un frasco de lujo.", notes="Notas acuáticas, cítricas, almizcle", image=m(1), gender="Masculino"),
        ProductDB(name="Odyssey Mandarín Sky", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Cítricos vibrantes que evocan un cielo despejado. Energía y frescura pura.", notes="Mandarina, notas cítricas, amaderadas", image=m(2), gender="Masculino"),
        ProductDB(name="Odyssey Mandarín Sky Elixir", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="La versión elixir del Mandarín Sky. Mayor concentración y una estela imponente.", notes="Mandarina, notas orientales, concentradas", image=m(3), gender="Masculino"),
        ProductDB(name="Odyssey Mandarín Sky Vintage", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Un clásico reimaginado. Elegancia vintage con un toque de mandarina sofisticada.", notes="Mandarina, notas vintage, amaderadas", image=m(4), gender="Masculino"),
        ProductDB(name="Odyssey Candee", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Dulzura irresistible con personalidad. Una fragancia golosa y envolvente.", notes="Notas dulces, gourmand, vainilla", image=f(0), gender="Femenino"),
        ProductDB(name="Odyssey Spectra", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Un espectro de notas que sorprende. Versatilidad y carácter en cada aplicación.", notes="Notas aromáticas, especiadas, amaderadas", image=m(5), gender="Masculino"),
        ProductDB(name="Club de Nuit Women", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Feminidad y poder en una fragancia nocturna. Para la mujer que brilla de noche.", notes="Notas florales, frutales, almizcle", image=f(1), gender="Femenino"),
        ProductDB(name="Club de Nuit Iconic", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="La definición de icónico. Presencia, elegancia y un sillage que enamora.", notes="Notas amaderadas, aromáticas, elegantes", image=m(0), gender="Masculino"),
        ProductDB(name="Club de Nuit Intense Man", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="Un clásico moderno con proyección excepcional. Elegancia y presencia en cada aplicación.", notes="Limón, grosellas negras, abedul, almizcle", image=m(2), gender="Masculino"),
        ProductDB(name="Club de Nuit Urban Man Elixir", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="El hombre urbano elevado al máximo. Sofisticación moderna con concentración elixir.", notes="Notas urbanas, amaderadas, especiadas", image=m(3), gender="Masculino"),
        ProductDB(name="Club de Nuit Sillage", brand="Armaf", category_id="perfumes", subcategory_id="arabes", description="El arte del sillage perfecto. Dejá tu marca en cada lugar al que vayas.", notes="Notas amaderadas, aromáticas, almizcle blanco", image=m(4), gender="Masculino"),

        # AFNAN
        ProductDB(name="9 PM Elixir", brand="Afnan", category_id="perfumes", subcategory_id="arabes", description="La versión más intensa del icónico 9 PM. Concentración máxima para noches inolvidables.", notes="Canela, lavanda, vainilla, ámbar concentrado", image=m(0), gender="Masculino"),
        ProductDB(name="9 AM", brand="Afnan", category_id="perfumes", subcategory_id="arabes", description="La contraparte matutina del 9 PM. Frescura energizante para empezar el día con todo.", notes="Notas cítricas, frescas, aromáticas", image=m(1), gender="Masculino"),
        ProductDB(name="9 PM Black", brand="Afnan", category_id="perfumes", subcategory_id="arabes", description="La versión más oscura y misteriosa de la línea 9 PM. Seducción pura.", notes="Notas oscuras, orientales, amaderadas", image=m(2), gender="Masculino"),
        ProductDB(name="9 PM Night Out", brand="Afnan", category_id="perfumes", subcategory_id="arabes", description="Diseñado para la noche perfecta. Carismático, magnético e inolvidable.", notes="Notas nocturnas, especiadas, dulces", image=m(3), gender="Masculino"),
        ProductDB(name="9 PM Velles", brand="Afnan", category_id="perfumes", subcategory_id="arabes", description="Una interpretación exclusiva dentro de la línea 9 PM. Refinamiento absoluto.", notes="Notas orientales, amaderadas, refinadas", image=m(4), gender="Masculino"),
        ProductDB(name="9 AM Poitiers Femme", brand="Afnan", category_id="perfumes", subcategory_id="arabes", description="Elegancia femenina francesa capturada en una fragancia matutina. Delicada y poderosa.", notes="Notas florales, frescas, elegantes", image=f(0), gender="Femenino"),

        # LATTAFA
        ProductDB(name="Khamrah Dukhan", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Humo y misterio en una fragancia oriental profunda. Khamrah en su versión más ahumada.", notes="Notas ahumadas, orientales, amaderadas", image=m(5), gender="Unisex"),
        ProductDB(name="Khamrah Qawha", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Inspirado en el ritual del café árabe. Calidez gourmand con alma oriental.", notes="Café, notas gourmand, especias cálidas", image=m(0), gender="Unisex"),
        ProductDB(name="Khamrah Clásico", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="El Khamrah original que conquistó al mundo. Dulzura oriental con profundidad inigualable.", notes="Notas orientales, dulces, amaderadas", image=m(1), gender="Unisex"),
        ProductDB(name="Whis Confesión", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Una confesión olfativa. Misterio y seducción en cada nota de esta fragancia única.", notes="Notas orientales, especiadas, seductoras", image=m(2), gender="Masculino"),
        ProductDB(name="Asad Negro", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="El león negro. Potencia y nobleza en una fragancia de presencia imponente.", notes="Notas amaderadas, especiadas, intensas", image=m(3), gender="Masculino"),
        ProductDB(name="Asad Zanzíbar", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Inspirado en las especias de Zanzíbar. Exotismo y calidez en cada aplicación.", notes="Especias exóticas, notas cálidas, ámbar", image=m(4), gender="Masculino"),
        ProductDB(name="Asad Bourbon", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="La fusión perfecta entre oriente y el carácter del bourbon. Robusto y cautivador.", notes="Bourbon, notas amaderadas, tabaco", image=m(5), gender="Masculino"),
        ProductDB(name="Yara Moi", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="La esencia del 'yo' femenino. Delicada, dulce y absolutamente cautivadora.", notes="Notas florales, dulces, gourmand", image=f(0), gender="Femenino"),
        ProductDB(name="Yara Tous", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Yara para todos los momentos. Versatilidad y encanto femenino sin límites.", notes="Notas florales, frutales, almizcle", image=f(1), gender="Femenino"),
        ProductDB(name="Yara Elixir", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="La concentración máxima de Yara. Profundidad y duración para la mujer exigente.", notes="Notas florales, orientales, concentradas", image=f(0), gender="Femenino"),
        ProductDB(name="Yara Candy", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Dulzura irresistible en su máxima expresión. Como un caramelo de lujo hecho fragancia.", notes="Notas dulces, gourmand, vainilla, caramelo", image=f(1), gender="Femenino"),
        ProductDB(name="Yara Women", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="La fragancia insignia de la línea Yara. Feminidad oriental en estado puro.", notes="Notas florales, orientales, almizcle", image=f(0), gender="Femenino"),
        ProductDB(name="Fakhar Negro", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="Orgullo en su forma más oscura y elegante. Una fragancia que inspira respeto.", notes="Notas amaderadas, especiadas, oscuras", image=m(0), gender="Masculino"),
        ProductDB(name="Fakhar Rosa", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="La versión rosada de Fakhar. Fuerza femenina con un toque floral sofisticado.", notes="Rosa, notas florales, almizcle", image=f(1), gender="Femenino"),
        ProductDB(name="Fakhar Gold", brand="Lattafa", category_id="perfumes", subcategory_id="arabes", description="La corona de la línea Fakhar. Opulencia dorada en una fragancia de alto impacto.", notes="Notas orientales, amaderadas, oud dorado", image=m(5), gender="Unisex"),
    ]

    for product in products:
        session.add(product)

    session.commit()
    print(f"[CelFra] Seeded {len(categories)} categories, {len(subcategories)} subcategories, {len(products)} products.")
