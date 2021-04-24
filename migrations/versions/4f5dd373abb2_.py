"""empty message

Revision ID: 4f5dd373abb2
Revises: 
Create Date: 2021-04-24 01:23:30.672667

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f5dd373abb2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('first_surname', sa.String(length=100), nullable=False),
    sa.Column('second_surname', sa.String(length=100), nullable=True),
    sa.Column('user_image', sa.String(length=2000), nullable=True),
    sa.Column('email', sa.String(length=250), nullable=True),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('active', sa.Boolean(), nullable=False),
    sa.Column('creation_date', sa.DateTime(), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('person',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('first_surname', sa.String(length=100), nullable=False),
    sa.Column('second_surname', sa.String(length=100), nullable=True),
    sa.Column('known_as', sa.String(length=100), nullable=True),
    sa.Column('telephone_number', sa.String(length=15), nullable=False),
    sa.Column('user_image', sa.String(length=2000), nullable=True),
    sa.Column('emergency_contact', sa.String(length=255), nullable=False),
    sa.Column('emergency_phone', sa.String(length=15), nullable=False),
    sa.Column('user_creation_id', sa.Integer(), nullable=True),
    sa.Column('creation_date', sa.DateTime(), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_creation_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('person_medicine',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('frequency', sa.String(length=1000), nullable=False),
    sa.Column('observation', sa.String(length=1000), nullable=True),
    sa.Column('user_creation_id', sa.Integer(), nullable=True),
    sa.Column('creation_date', sa.DateTime(), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_creation_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('person_qr',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('url', sa.String(length=2000), nullable=False),
    sa.Column('user_creation_id', sa.Integer(), nullable=True),
    sa.Column('creation_date', sa.DateTime(), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_creation_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('person_vaccine',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=1000), nullable=False),
    sa.Column('application_date', sa.Date(), nullable=False),
    sa.Column('user_creation_id', sa.Integer(), nullable=True),
    sa.Column('creation_date', sa.DateTime(), nullable=False),
    sa.Column('update_date', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['user_creation_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('person_vaccine')
    op.drop_table('person_qr')
    op.drop_table('person_medicine')
    op.drop_table('person')
    op.drop_table('user')
    # ### end Alembic commands ###
