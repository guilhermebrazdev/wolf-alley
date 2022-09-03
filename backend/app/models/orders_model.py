from datetime import datetime
from app.configs.database import db 
from sqlalchemy import Column, Date, Integer
from sqlalchemy.orm import relationship
from dataclasses import dataclass

@dataclass
class Order(db.Model):
    __tablename__ = "orders"

    current_date = datetime.now().strftime("%d/%m/%Y %I:%M:%S %p")

    id: int
    date: str
    price: int

    id = Column(Integer, primary_key=True)
    date = Column(Date, default=current_date)
    price = Column(Integer, nullable=False) 

    # costumer = relationship("Client", back_populates="orders", uselist=False)