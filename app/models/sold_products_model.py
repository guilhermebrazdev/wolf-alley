from app.configs.database import db
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from dataclasses import dataclass

@dataclass
class SoldProduct(db.Model):
    __tablename__ = "sold_products"

    id: int
    name: str
    price: int
    category: str
    product_id: int

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    category = Column(String, ForeignKey("categories.name"))
    product_id = Column(Integer, nullable=False) 

    all_orders = relationship("AllOrder", back_populates="sold_products")
