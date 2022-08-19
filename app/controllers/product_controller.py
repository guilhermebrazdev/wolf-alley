from http import HTTPStatus
from flask import request, jsonify

from sqlalchemy.orm import Session

from psycopg2.errors import UniqueViolation
from sqlalchemy.exc import IntegrityError

from app.configs.database import db
from app.exceptions import InvalidValues, ProductNotFound, WrongKeys
from app.models import Product 
from app.services import product_services

def insert_product():
    data = request.get_json()

    try:
        data = product_services.check_keys(data)
        product_services.check_category(data)

        product = Product(**data)

        session: Session = db.session()

        session.add(product)
        session.commit()


    except IntegrityError as i:

        if isinstance(i.orig, UniqueViolation):
            return {"error": "Produto já registrado na database."}, HTTPStatus.CONFLICT

        else:
            raise i.orig

    except WrongKeys:
        return {"error": "Chaves inválidas!"}, HTTPStatus.BAD_REQUEST
   
    except InvalidValues:
        return {"error": "Valores inválidos!"}, HTTPStatus.BAD_REQUEST
    


    return jsonify(product), HTTPStatus.CREATED


def retrieve_products():
    session: Session = db.session()
    
    products = session.query(Product).all()

    return jsonify(products), HTTPStatus.OK


def update_product(product_id: int):
    payload = request.get_json()

    try:

        session: Session = db.session()


        product = product_services.verify_product(product_id)

        payload = product_services.update_data(payload)

        for key, value in payload.items():
            print(key, value)
            setattr(product, key, value)

        session.commit()

    except IntegrityError as i:

        if isinstance(i.orig, UniqueViolation):
            return {"error": "Produto já registrado na database."}, HTTPStatus.CONFLICT

        else:
            raise i.orig

    except ProductNotFound:
        return {"error": "Produto não encontrado!"}, HTTPStatus.NOT_FOUND

    except InvalidValues:
        return {"error": "Valor inválido!"}, HTTPStatus.BAD_REQUEST

    except WrongKeys:
        return {"error": "Chaves erradas!"}, HTTPStatus.BAD_REQUEST

    return jsonify(product), HTTPStatus.OK 


def delete_product(product_id: int):
    try:
        session: Session = db.session()

        product = product_services.verify_product(product_id)

        session.delete(product)
        session.commit()
    
    except ProductNotFound:
        return {"error": "Produto não encontrado!"}, HTTPStatus.NOT_FOUND
    
    return "", HTTPStatus.NO_CONTENT

