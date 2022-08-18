from app.configs.database import db
from sqlalchemy import Column, Integer, Date, String, Boolean
from sqlalchemy.orm import relationship
from dataclasses import dataclass

@dataclass
class AllOrder(db.Model):
    __tablename__ = "all_orders"

    id: int
    date: Date
    client_name: str
    client_cpf: str
    active_client: bool
    order_id: int
    price: int
    
    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    client_name = Column(String, nullable=False)
    client_cpf = Column(String, nullable=False)
    active_client = Column(Boolean, nullable=False)
    order_id = Column(Integer, nullable=False)
    price = Column(Integer, nullable=False)

    # sold_products = relationship("SoldProduct", back_populates="all_orders")

