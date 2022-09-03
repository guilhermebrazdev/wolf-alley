from flask import Blueprint
from .client_route import bp as bp_client
from .product_route import bp as bp_product 
from .order_route import bp as bp_order

bp_api = Blueprint("api", __name__)

def init_app(app):
    bp_api.register_blueprint(bp_client)
    bp_api.register_blueprint(bp_product)
    bp_api.register_blueprint(bp_order)

    app.register_blueprint(bp_api)
    