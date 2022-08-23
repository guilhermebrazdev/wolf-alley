from sqlalchemy.orm import Session

from app.configs.database import db 
from app.exceptions import InvalidValues, ProductNotFound, WrongKeys
from app.models import Category, Product 

def check_keys(data: dict):
    data_keys = data.keys()
    default_keys = ['name', 'price', 'available_amount', 'category']


    if set(default_keys) != set(data_keys):
        raise WrongKeys
    
    if type(data['name']) != str or type(data['price']) != int or type(data['available_amount']) != int or type(data['category']) != str or data['available_amount'] < 0 or data['price'] < 0:
        raise InvalidValues
    

    data['category'] = data['category'].title()
    data['name'] = data['name'].title()
    


    return data

def check_category(data: dict):
    session: Session = db.session()

    category_name = data["category"]

    category = session.query(Category).get(category_name)

    if not category:
        category_data = {'name': category_name}

        category = Category(**category_data)

        session.add(category)
        session.commit()


def verify_product(product_id):
    session: Session = db.session()

    product = session.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise ProductNotFound

    return product


def update_data(payload: dict):
    default_keys = ['name', 'price', 'available_amount', 'category']

    payload_keys = payload.keys()

    for key in payload_keys:
        if key not in default_keys:
            raise WrongKeys
        
        if key == 'name' or key =='category':
            if type(payload[key]) != str:
                InvalidValues

            payload[key] = payload[key].title()

            if key == 'category':
                check_category(payload)

        if key == 'available_amount' or key == 'price':
            if type(payload[key]) != int or payload[key] < 0 :
                raise InvalidValues

    return payload

