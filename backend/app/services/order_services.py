from sqlalchemy.orm.session import Session
from app.configs.database import db 
from app.models import AllOrder


def order_by_client(client_cpf: str):
    session: Session = db.session()

    orders = session.query(AllOrder).filter(AllOrder.client_cpf == client_cpf).all()

    return orders