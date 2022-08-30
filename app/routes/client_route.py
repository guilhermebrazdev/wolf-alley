from flask import Blueprint
from app.controllers import client_controller 

bp = Blueprint("clients", __name__, url_prefix="/clients")


bp.post("")(client_controller.insert_client)
bp.get("")(client_controller.retrieve_clients)
bp.get("/<client_cpf>")(client_controller.get_client_by_cpf)
bp.patch("/<client_cpf>")(client_controller.update_client)
bp.post("/login")(client_controller.login)
bp.post("/checkout/<client_cpf>")(client_controller.checkout)
bp.delete("/<client_cpf>")(client_controller.delete_client)

# bp.post("/token")(client_controller.get_token)
# bp.post("/hash")(client_controller.make_hash)