from flask import Flask
from app import routes
from flask_cors import CORS

from app.configs import database, migration

def create_app():
    app = Flask(__name__)
    CORS(app, origins=['http://localhost:3000'], methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"])

    database.init_app(app)
    migration.init_app(app)
    
    routes.init_app(app)

    return app