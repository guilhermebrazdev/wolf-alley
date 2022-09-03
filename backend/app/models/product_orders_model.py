from app.configs.database import db 
from sqlalchemy import Column, ForeignKey, Integer
from dataclasses import dataclass

@dataclass
class ProductOrder(db.Model):

    __tablename__ = "product_orders"

    id: int
    order_id: int
    product_id: int
    amount: int

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id", ondelete="CASCADE"))
    amount = Column(Integer, nullable=False, default=1)