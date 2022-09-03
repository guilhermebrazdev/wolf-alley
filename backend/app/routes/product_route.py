from flask import Blueprint
from app.controllers import product_controller

bp = Blueprint("products", __name__, url_prefix="/products")

bp.post("")(product_controller.insert_product)
bp.get("")(product_controller.retrieve_products)
bp.patch("/<int:product_id>")(product_controller.update_product)
bp.delete("/<int:product_id>")(product_controller.delete_product)