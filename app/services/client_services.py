from pydoc import cli
from app.configs.database import db
from app.exceptions import ClientNotFound, CpfInvalid, DuplicateProduct, InvalidValues, ProductNotFound, UnavailableProduct, UndefinedQuantity, WrongKeys 


from sqlalchemy.orm.session import Session

from app.models import Client, Product, ProductOrder, ClientOrder



def check_keys(data: dict):
    data_keys = data.keys()
    default_keys = ['name', 'email', 'cpf', 'birthday']

    if set(data_keys) != set(default_keys):
        raise WrongKeys

    if type(data['name']) != str or type(data['cpf']) != str or type(data['email']) != str or type(data['birthday']) != str:
        raise InvalidValues

    data['cpf'] = data['cpf'].replace(".", "")
    data['cpf'] = data['cpf'].replace("-", "")

    if data['cpf'].isnumeric() is not True or len(data['cpf']) != 11:
        raise CpfInvalid

    data['name'] = data['name'].title()

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
        # print(f"{product.id=}")
        
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

        # print(f"{current_product=}")

        remaining_products = current_product.available_amount - product['quantity']
        # print(f"{remaining_products=}")

        setattr(current_product, "available_amount", remaining_products )

        total_price += (product['price'] * product['quantity'])

    session.commit()

    return total_price


def register_products_order(products: list, order_id: int):
    session: Session = db.session()

    for product in products:
        print(f"{product=}")

        product_order_data = {
            "order_id": order_id,
            "product_id": product['id'],
            "amount": product['quantity']
        }

        product_order = ProductOrder(**product_order_data)
        
        session.add(product_order)
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
