"""make active_client column defaults to True in all_orders table

Revision ID: 45ce9d1ab312
Revises: 988066a2da9a
Create Date: 2022-08-23 20:01:30.696944

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '45ce9d1ab312'
down_revision = '988066a2da9a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('all_orders', 'active_client',
               existing_type=sa.BOOLEAN(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('all_orders', 'active_client',
               existing_type=sa.BOOLEAN(),
               nullable=False)
    # ### end Alembic commands ###
