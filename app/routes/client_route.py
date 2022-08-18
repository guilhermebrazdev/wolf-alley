from flask import Blueprint
from app.controllers import client_controller 

bp = Blueprint("clients", __name__, url_prefix="/clients")


bp.post("")(client_controller.insert_client)
bp.get("")(client_controller.retrieve_clients)
bp.get("/<client_cpf>")(client_controller.get_client_by_cpf)
bp.patch("/<client_cpf>")(client_controller.update_client)
bp.delete("/<client_cpf>")(client_controller.delete_client)