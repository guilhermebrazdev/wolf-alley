from app.configs.database import db 
from sqlalchemy import Column, Date, Integer
from dataclasses import dataclass

@dataclass
class Order(db.Model):

    id: int
    date: str
    price: int

    id: Column(Integer, primary_key=True, nullable=False)
    date: Column(Date, nullable=False)
    price: Column(Integer, nullable=False)