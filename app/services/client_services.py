from pydoc import cli
from app.configs.database import db
from app.exceptions import ClientNotFound, CpfInvalid, InvalidValues, WrongKeys 


from sqlalchemy.orm.session import Session

from app.models.clients_model import Client



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
