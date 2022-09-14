from flask import Blueprint
from app.controllers import order_controller

bp = Blueprint("orders", __name__, url_prefix="/orders")

bp.get("")(order_controller.all_orders)
bp.get("/<client_cpf>")(order_controller.orders_by_client)