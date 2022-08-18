from http import HTTPStatus
from pydoc import cli
from flask import request, jsonify
from sqlalchemy.orm.session import Session
from app.configs.database import db

from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
from app.exceptions import ClientNotFound, CpfInvalid, InvalidValues, WrongKeys

from app.models.clients_model import Client
from app.services import client_services


def insert_client():
    data = request.get_json()

    try:
        data = client_services.check_keys(data) 

        session: Session = db.session

        client = Client(**data)

        session.add(client)
        session.commit()

    except IntegrityError as i:
        
        if isinstance(i.orig, UniqueViolation):

            return {"error": "Cliente já registrado!"}, HTTPStatus.CONFLICT
        else: 
            raise i.orig
    
    except WrongKeys:
        return {"error": "Chaves inválidas!"}, HTTPStatus.BAD_REQUEST
   
    except InvalidValues:
        return {"error": "Valores inválidos!"}, HTTPStatus.BAD_REQUEST
    
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST

    return jsonify(client), HTTPStatus.CREATED


def retrieve_clients():
    clients = Client.query.all()

    return {'clients': clients}, HTTPStatus.OK


def get_client_by_cpf(client_cpf: str):
    try:
        client = client_services.verify_client(client_cpf)
        
    except ClientNotFound:
        return {"error": "Cliente não encontrado!"}, HTTPStatus.NOT_FOUND

    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST

    return jsonify(client), HTTPStatus.OK



def update_client(client_cpf: str):
    payload = request.get_json()
    
    try:
        client = client_services.verify_client(client_cpf)

        payload = client_services.update_data(payload)

        session: Session = db.session()

        for key, value in payload.items():

            setattr(client, key, value)
            session.commit()

    except IntegrityError as i:
        if isinstance(i.orig, UniqueViolation):

            return {"error": "Cliente já registrado!"}, HTTPStatus.CONFLICT
        else: 
            raise i.orig
    
    except WrongKeys:
        return {"error": "Chaves inválidas!"}, HTTPStatus.BAD_REQUEST
   
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST
    
    except ClientNotFound:
        return {"error": "Cliente não encontrado!"}, HTTPStatus.NOT_FOUND

    return jsonify(client),HTTPStatus.OK


def delete_client(client_cpf: str):
    try:
        session: Session = db.session()
        client = client_services.verify_client(client_cpf)

        session.delete(client)
        session.commit()

    except ClientNotFound:
        return {"error": "Cliente não encontrado"}, HTTPStatus.NOT_FOUND
    
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST

    return "", HTTPStatus.NO_CONTENT