from http import HTTPStatus
from flask import request, jsonify
from sqlalchemy.orm.session import Session
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
from jwt.exceptions import InvalidSignatureError, DecodeError


from app.exceptions import AdmRequired, ClientNotFound, CpfInvalid, DuplicateProduct, InvalidCredentials, InvalidValues, MissingToken, ProductNotFound, UnavailableProduct, UndefinedQuantity, WrongKeys
from app.configs.database import db
from app.models import Client, Order
from app.services import client_services


def insert_client():
    data = request.get_json()

    try:
        data = client_services.check_keys(data) 

        session: Session = db.session()

        client = Client(**data)

        session.add(client)

        session.commit()

    except IntegrityError as i:
        
        if isinstance(i.orig, UniqueViolation):

            return {"error": "Cliente já registrado!"}, HTTPStatus.CONFLICT
        else: 
            raise i.orig
    
    except WrongKeys:
        print("WRONGÃO")

        return {"error": "Chaves inválidas!"}, HTTPStatus.BAD_REQUEST
   
    except InvalidValues:
        return {"error": "Valores inválidos!"}, HTTPStatus.BAD_REQUEST
    
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST
    
    except InvalidSignatureError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST

    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED

    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST

    except ClientNotFound:
        return {"error": "Cliente não encontrado"}, HTTPStatus.NOT_FOUND

    return jsonify(client), HTTPStatus.CREATED


def retrieve_clients():

    try:
        token = client_services.get_token()
        client_services.validate_adm(token)

        clients = Client.query.all()

    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED
        
    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST
    
    except ClientNotFound:
        return {"error": "Cliente não encontrado"}, HTTPStatus.NOT_FOUND

    return {'clients': clients}, HTTPStatus.OK


def get_client_by_cpf(client_cpf: str):
    try:
        client: Client = client_services.verify_client(client_cpf)

        token = client_services.get_token()
        client_services.validate_user(client.id, token)
        
    except ClientNotFound:
        return {"error": "Cliente não encontrado!"}, HTTPStatus.NOT_FOUND

    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST

    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED
        
    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST

    return jsonify(client), HTTPStatus.OK



def update_client(client_cpf: str):
    payload = request.get_json()
    
    try:
        client: Client = client_services.verify_client(client_cpf)

        token = client_services.get_token()

        client_services.validate_user(client.id, token)

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
    
    except InvalidValues:
        return {"error": "Valores inválidos!"}, HTTPStatus.BAD_REQUEST
   
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST
    
    except ClientNotFound:
        return {"error": "Cliente não encontrado!"}, HTTPStatus.NOT_FOUND

    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED
    
    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST

    return jsonify(client),HTTPStatus.OK


def checkout(client_cpf: str):
    session: Session = db.session()

    try:
        data = request.get_json()

        client: Client = client_services.verify_client(client_cpf)

        token = client_services.get_token()

        client_services.validate_user(client.id, token)

        data = client_services.checkout_keys(data)

        all_buying_products = client_services.packing_products(data['products'])

        buying_products = client_services.checking_duplicates(all_buying_products)

        total_price = client_services.calculate_price(buying_products)

        order_data = {"price": total_price}

        order = Order(**order_data)
        session.add(order)

        session.commit()

        all_order = client_services.register_all_order(client, order, total_price)
        client_services.register_products_order(buying_products, order.id, all_order.id)
        client_services.register_client_order(client.id, order.id)

        checkout_return ={
            "order_id": order.id,
            "client_cpf": client.cpf,
            "products": buying_products,
            "date": order.date
        }

    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST
    
    except ClientNotFound:
        return {"error": "Cliente não encontrado!"}, HTTPStatus.NOT_FOUND
    
    except WrongKeys:
        return {"error": "Chaves inválidas!"}, HTTPStatus.BAD_REQUEST
    
    except InvalidValues:
        return {"error": "Valores inválidos!"}, HTTPStatus.BAD_REQUEST
    
    except UndefinedQuantity:
        return {"error": "A quantidade deve ser um valor inteiro e maior que zero!"}, HTTPStatus.UNPROCESSABLE_ENTITY
    
    except ProductNotFound:
        return {"error": "Produto não encontrado!"}, HTTPStatus.NOT_FOUND

    except DuplicateProduct:
        return {
            "error": "Produto pedido mais de uma vez na mesma compra, considere incrementar a quantidade"
        }, HTTPStatus.UNPROCESSABLE_ENTITY

    except UnavailableProduct:
        return {
            "error": "Produto não disponível ou demanda excedente ao estoque"
        }, HTTPStatus.UNPROCESSABLE_ENTITY
    
    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED
    
    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST
        
    return checkout_return, HTTPStatus.OK


def delete_client(client_cpf: str):
    try:
        session: Session = db.session()
        client: Client = client_services.verify_client(client_cpf)

        token = client_services.get_token()
        client_services.validate_user(client.id, token)

        session.delete(client)
        session.commit()

    except ClientNotFound:
        return {"error": "Cliente não encontrado"}, HTTPStatus.NOT_FOUND
    
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST
       
    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED
    
    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST

    return "", HTTPStatus.NO_CONTENT


def login():    
    data = request.get_json()

    try:
        token = client_services.gen_token(data)

    except InvalidCredentials:
        return {"error": "Credenciais inválidas!"}, HTTPStatus.UNAUTHORIZED

    return {"token": token}, HTTPStatus.OK
