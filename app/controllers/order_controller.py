from http import HTTPStatus
from app.configs.database import db 

from sqlalchemy.orm.session import Session
from app.exceptions import AdmRequired, ClientNotFound, CpfInvalid, MissingToken
from app.models import AllOrder
from app.models import Client

from app.services import client_services, order_services
from jwt.exceptions import DecodeError, InvalidSignatureError



def all_orders():
    session: Session = db.session()

    try:
        token = client_services.get_token()
        client_services.validate_adm(token)

        orders = session.query(AllOrder).all()
        # orders = AllOrder.query.all()

    except MissingToken:
        return {"error": "Token não foi enviado!"}, HTTPStatus.BAD_REQUEST

    except AdmRequired:
        return {"error": "Necessita de permissão do administrador!"}, HTTPStatus.UNAUTHORIZED
        
    except DecodeError:
        return {"error": "Formato de token inválido!"}, HTTPStatus.BAD_REQUEST
    
    except ClientNotFound:
        return {"error": "Cliente não encontrado"}, HTTPStatus.NOT_FOUND


    return {"orders": orders}, HTTPStatus.OK


def orders_by_client(client_cpf: str):
    try:
        client: Client = client_services.verify_client(client_cpf)

        token = client_services.get_token()
        client_services.validate_user(client.id, token)

        orders = order_services.order_by_client(client.cpf)
    
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

    
    return {"orders": orders}, HTTPStatus.OK