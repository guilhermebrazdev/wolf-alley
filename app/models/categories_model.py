from app.configs.database import db 
from sqlalchemy import Column, String
from dataclasses import dataclass


@dataclass
class Category(db.Model):
    __tablename__ = "categories"

    name: str

    name = Column(String, primary_key=True)