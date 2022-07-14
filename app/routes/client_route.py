from flask import Blueprint
from app.controllers import client_controller 

bp = Blueprint("clients", __name__, url_prefix="/clients")


bp.get("")(client_controller.retrieve_clients)