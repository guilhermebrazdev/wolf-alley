from email.policy import default
from app.configs.database import db
from sqlalchemy import Column, Date, Integer, String, Boolean
from sqlalchemy.orm import relationship
from dataclasses import dataclass

@dataclass
class Client(db.Model):

    __tablename__ = "clients"

    id : int
    name: str
    email: str
    cpf: str
    birthday: str
    # password: str

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    cpf = Column(String(11), nullable=False, unique=True)
    birthday = Column(Date, nullable=False)
    password = Column(String, nullable=False)
    isAdm = Column(Boolean, nullable=False)

    # orders = relationship("Order", back_populates="costumer")