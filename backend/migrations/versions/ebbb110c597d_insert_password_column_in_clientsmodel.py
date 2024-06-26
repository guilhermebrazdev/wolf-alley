"""insert password column in clientsModel

Revision ID: ebbb110c597d
Revises: 45ce9d1ab312
Create Date: 2022-08-24 20:58:56.018171

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebbb110c597d'
down_revision = '45ce9d1ab312'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('clients', sa.Column('password', sa.String(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('clients', 'password')
    # ### end Alembic commands ###
