from bcrypt import hashpw, gensalt, checkpw
import jwt

from app.configs.database import db
from app.exceptions import AdmRequired, ClientNotFound, CpfInvalid, DuplicateProduct, InvalidCredentials, InvalidValues, MissingToken, ProductNotFound, UnavailableProduct, UndefinedQuantity, WrongKeys 

from flask import request

from sqlalchemy.orm.session import Session

from app.models import Client, Product, ProductOrder, ClientOrder, SoldProduct, SoldOrder, Order, AllOrder


def check_keys(data: dict):
    data_keys = data.keys()
    default_keys = ['name', 'email', 'cpf', 'birthday', 'password', 'isAdm']

    if set(data_keys) != set(default_keys):
        raise WrongKeys

    if type(data['name']) != str or type(data['cpf']) != str or type(data['email']) != str or type(data['birthday']) != str or type(data['password']) != str or type(data['isAdm']) != bool:
        raise InvalidValues

    data['cpf'] = data['cpf'].replace(".", "")
    data['cpf'] = data['cpf'].replace("-", "")

    if data['cpf'].isnumeric() is not True or len(data['cpf']) != 11:
        raise CpfInvalid

    data['name'] = data['name'].title()

    senha = data['password'].encode('utf-8')
    salt = gensalt()

    data['password'] = hashpw(senha, salt).decode('utf-8')

    if data['isAdm'] == True:
        validate_adm(data)

    return data


def update_data(payload: dict):
    default_keys = ['name', 'email', 'cpf', 'birthday']

    payload_keys = payload.keys()

    for key in payload_keys:
        if key not in default_keys:
            raise WrongKeys
        
        if type(payload[key]) != str:
            InvalidValues

        if key == "name":
            payload[key] = payload[key].title()

        if key == 'cpf':
            payload[key] = payload[key].replace(".", "")
            payload[key] = payload[key].replace("-", "")
            
            if payload[key].isnumeric() is not True or len(payload[key]) != 11:
                raise CpfInvalid

    return payload


def verify_client(client_cpf: str):
    session: Session = db.session()

    client_cpf = client_cpf.replace(".", "")
    client_cpf = client_cpf.replace("-", "")

    if client_cpf.isnumeric() is not True or len(client_cpf) != 11:
        raise CpfInvalid

    client = session.query(Client).filter(Client.cpf == client_cpf).first()

    if not client:
        raise ClientNotFound

    return client


def checkout_keys(data: dict):
    data_keys = data.keys()
    default_keys = ['products']

    if set(default_keys) != set(data_keys):
        raise WrongKeys

    if type(data['products']) != list:
        raise InvalidValues 

    for product in data["products"]:

        if type(product) != dict:
            raise WrongKeys
        
        product_default_keys = ['product_id', 'quantity']
        product_keys = product.keys()
        
        if set(product_keys) != set(product_default_keys):
            raise WrongKeys
        
        for key in product_keys:

            if type(product[key]) != int: 
                raise InvalidValues
                
            if key == 'quantity':
                if product[key] <= 0 :
                    raise UndefinedQuantity

    return data


def packing_products(products: list):
    session: Session = db.session()

    all_buying_products = []

    for each_product in products:
        product = session.query(Product).get(each_product['product_id'])
        
        if not product:
            raise ProductNotFound

        product = product.__dict__

        product = {key: value for key, value in product.items() if key != '_sa_instance_state' }

        product['quantity'] = each_product['quantity']

        
        all_buying_products.append(product)

    return all_buying_products


def checking_duplicates(products: list):
    product_id_list = [product['id'] for product in products]

    product_list_check = []

    for product_id in product_id_list:
        if product_id not in product_list_check:
            product_list_check.append(product_id)
        else:
            raise DuplicateProduct 
        
    return products
    

def check_available_amount(products: list):
    for product in products:

        if product['available_amount'] < product['quantity']:
            raise UnavailableProduct


def calculate_price(products: list):
    session: Session = db.session()

    total_price = 0

    check_available_amount(products) 

    for product in products:

        current_product = session.query(Product).get(product['id'])
        # current_product = Product.query.get(product['id'])

        remaining_products = current_product.available_amount - product['quantity']

        setattr(current_product, "available_amount", remaining_products )

        total_price += (product['price'] * product['quantity'])

    session.commit()

    return total_price


def register_all_order(client: Client, order: Order, price: int):
    session: Session = db.session()
    
    all_order_data = {
        "client_name": client.name,
        "client_cpf": client.cpf,
        "order_id": order.id,
        "price": price
    }

    all_order = AllOrder(**all_order_data)
    session.add(all_order)
    
    
    session.commit()

    return all_order


def register_products_order(products: list, order_id: int, all_order_id: int):
    session: Session = db.session()

    for product in products:

        product_order_data = {
            "order_id": order_id,
            "product_id": product['id'],
            "amount": product['quantity']
        }

        product_order = ProductOrder(**product_order_data)
        session.add(product_order)


        sold_product_data = {
            "name": product['name'],
            "price": product['price'],
            "category": product['category'],
            "product_id": product['id']
        }
        
        sold_product = SoldProduct(**sold_product_data)
        session.add(sold_product)

        session.commit()
        
        sold_order(sold_product.id, all_order_id, product['quantity'])


def sold_order(sold_product_id: int, all_order_id: int, product_amount: int):
    session: Session = db.session()

    sold_order_data = {
        "sold_product_id": sold_product_id,
        "all_order_id": all_order_id,
        "product_amount":   product_amount
    }

    sold_order = SoldOrder(**sold_order_data)
    session.add(sold_order)

    session.commit()


def register_client_order(client_id: int, order_id: int):
    session: Session = db.session()

    client_order_data = {
        "order_id": order_id,
        "client_id": client_id
    }

    client_order = ClientOrder(**client_order_data)
    session.add(client_order)


    session.commit()


def gen_token(data: dict):
    session: Session = db.session()
    
    client: Client = session.query(Client).filter(Client.email == data['email']).first()

    if not client:
        raise InvalidCredentials

    pwd = data['password'].encode('utf-8')
    client_pwd = client.password.encode('utf-8')

    pwd_match = checkpw(pwd, client_pwd)

    if not pwd_match:
        raise InvalidCredentials

    client_serialize = {
        "id": client.id,
        "name": client.name,
        "email": client.email,
        "cpf": client.cpf,
        "birthday": str(client.birthday),
        "isAdm": client.isAdm
    }

    token = jwt.encode(client_serialize, 'lobo_secreto')

    return token


def validate_adm(data: dict):
    headers = request.headers

    for each_info in headers:
        
        if "Authorization" in each_info:
            token = each_info[1].split(' ')[1]
            
    if not token:
        raise MissingToken
    
    info = jwt.decode(token, 'lobo_secreto', algorithms='HS256')

    if info['isAdm'] == False:
        raise AdmRequired 
    


