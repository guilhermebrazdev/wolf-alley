from app.configs.database import db 
from sqlalchemy import Column, ForeignKey, Integer
from dataclasses import dataclass

@dataclass
class ClientOrder(db.Model):

    __tablename__ = "client_orders"

    id: int
    order_id: int
    client_id: int

    id = Column(Integer, primary_key=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    client_id = Column(Integer, ForeignKey("clients.id"))