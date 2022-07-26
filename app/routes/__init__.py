from flask import Blueprint
from .client_route import bp as bp_client

bp_api = Blueprint("api", __name__)

def init_app(app):
    bp_api.register_blueprint(bp_client)

    app.register_blueprint(bp_api)