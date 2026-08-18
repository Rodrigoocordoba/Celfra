"""
CelFra Perfumes — Database Models (SQLModel)
"""

from sqlmodel import SQLModel, Field, Relationship
from typing import Optional


class CategoryDB(SQLModel, table=True):
    """Top-level category: perfumes, belleza, combos."""
    __tablename__ = "categories"

    id: str = Field(primary_key=True)
    name: str
    description: str = ""
    icon: str = ""

    subcategories: list["SubcategoryDB"] = Relationship(back_populates="category")


class SubcategoryDB(SQLModel, table=True):
    """Subcategory within a parent category."""
    __tablename__ = "subcategories"

    id: str = Field(primary_key=True)
    name: str
    category_id: str = Field(foreign_key="categories.id")

    category: CategoryDB = Relationship(back_populates="subcategories")


class ProductDB(SQLModel, table=True):
    """A product in the catalog."""
    __tablename__ = "products"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    brand: str
    category_id: str = Field(foreign_key="categories.id")
    subcategory_id: str = Field(foreign_key="subcategories.id")
    size: str = ""
    description: str = ""
    notes: str = ""
    image: str = ""
    gender: str = "Unisex"
