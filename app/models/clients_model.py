from app.configs.database import db
from sqlalchemy import Column, Date, Integer, String
from dataclasses import dataclass

@dataclass
class ClientsModel(db.Model):

    __tablename__ = "clients"

    id : int
    name: str
    email: str
    cpf: str
    birthday: str

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True)
    cpf = Column(String(11), nullable=False, unique=True)
    birthday = Column(Date, nullable=False)