from http import HTTPStatus
from flask import request, jsonify
from sqlalchemy.orm.session import Session
from sqlalchemy.exc import IntegrityError
from psycopg2.errors import UniqueViolation
import jwt
from bcrypt import hashpw, gensalt, checkpw
from jwt.exceptions import InvalidSignatureError


from app.exceptions import AdmRequired, ClientNotFound, CpfInvalid, DuplicateProduct, InvalidCredentials, InvalidValues, MissingToken, ProductNotFound, UnavailableProduct, UndefinedQuantity, WrongKeys
from app.configs.database import db
from app.models import Client, Order
from app.services import client_services


def insert_client():
    print('-'*100)
    data = request.get_json()

    try:
        data = client_services.check_keys(data) 

        session: Session = db.session

        client = Client(**data)

        session.add(client)

        print('-'*100)
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
    
    except InvalidSignatureError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST

    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED


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
    
    except InvalidValues:
        return {"error": "Valores inválidos!"}, HTTPStatus.BAD_REQUEST
   
    except CpfInvalid:
        return {"error": "Cpf inválido!"}, HTTPStatus.BAD_REQUEST
    
    except ClientNotFound:
        return {"error": "Cliente não encontrado!"}, HTTPStatus.NOT_FOUND

    return jsonify(client),HTTPStatus.OK


def checkout(client_cpf: str):
    session: Session = db.session()

    try:
        data = request.get_json()

        client = client_services.verify_client(client_cpf)

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
        
    return checkout_return, HTTPStatus.OK


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


def login():    
    print('-'*100)

    data = request.get_json()

    try:
        token = client_services.gen_token(data)

    except InvalidCredentials:
        return {"error": "Credenciais inválidas!"}, HTTPStatus.UNAUTHORIZED

    return {"token": token}, HTTPStatus.OK


# def login_teste():
#     print("-"*100)
#     data = request.get_json()

#     print(f"{data=}")

#     token = jwt.encode(data, 'lobo_secreto')
#     print(f"{token=}")

#     print("-"*100)
#     return {"login": "loga ai man kk."}, HTTPStatus.OK


# def get_token():
#     print("-"*100)
#     headers = request.headers

#     for each_info in headers:
        
#         if "Authorization" in each_info:
#             token = each_info[1].split(' ')[1]

#     print(f"{token=}")

#     info = jwt.decode(token, 'lobo_secreto', algorithms='HS256')
#     print(f"{info=}")

#     print("-"*100)
#     return {"token": "é o decodas ?"}


# def make_hash():
#     print("-"*100)
#     data = request.get_json()

#     senha = 'lobo'.encode('utf-8')
#     salt = gensalt()
#     pwd_hash = hashpw(senha, salt)

#     print(f"{data=}")
#     print(f"{salt=}")
#     print(f"{senha=}")
#     print(f"{pwd_hash=}")
#     print(f"{type(pwd_hash)=}")

#     match_pwd = checkpw(data['name'].encode('utf-8'), pwd_hash)
#     print(f"{match_pwd=}")

#     print("-"*100)
#     return {"hash": "Hash secretão"}
