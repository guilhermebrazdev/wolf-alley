from app.configs.database import db 
from sqlalchemy import Column, Date, Integer
from dataclasses import dataclass

@dataclass
class Order(db.Model):
    __tablename__ = "orders"

    id: int
    date: str
    price: int

    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False)
    price = Column(Integer, nullable=False)