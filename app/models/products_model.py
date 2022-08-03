from unicodedata import category
from app.configs.database import db 
from sqlalchemy import Column, ForeignKey, Integer, String
from dataclasses import dataclass


@dataclass
class ProductsModel(db.Model):
    __tablename__ = "products"

    id: int
    name: str
    price: int
    available_amount: int
    # category: str

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    available_amount = Column(Integer, default= 0)
    # category = Column(String, ForeignKey("categories.name"))