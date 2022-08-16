from http import HTTPStatus
from builtins import print
from flask import request, jsonify
from sqlalchemy.orm.session import Session
from app.configs.database import db

from app.models.clients_model import Client

def retrieve_clients():
    return {"clients": "chama na clientela"}


def insert_client():
    data = request.get_json()

    data["name"].title()

    session: Session = db.session()

    client = Client(**data)

    session.add(client)
    session.commit()

    # try:
    #     data["name"].title()

    #     session: Session = db.session

    #     client = Client(**data)

    #     session.add(client)
    #     session.commit()

    # except:
    #     return {"error": "Chaves erradas"}, HTTPStatus.BAD_REQUEST

    return jsonify(client), HTTPStatus.CREATED

