from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
db = SQLAlchemy()

def init_app(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv("DATABASE_URI")
    # app.config[""]