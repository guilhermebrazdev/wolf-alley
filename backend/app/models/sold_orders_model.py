from app.configs.database import db 
from sqlalchemy import Column, Integer, ForeignKey
from dataclasses import dataclass

@dataclass
class SoldOrder(db.Model):
    __tablename__ = "sold_orders"

    id: int
    sold_product_id: int
    all_order_id: int

    id = Column(Integer, primary_key=True)
    sold_product_id = Column(Integer, ForeignKey('sold_products.id'))
    all_order_id = Column(Integer, ForeignKey('all_orders.id'))
    product_amount = Column(Integer, nullable=False)
