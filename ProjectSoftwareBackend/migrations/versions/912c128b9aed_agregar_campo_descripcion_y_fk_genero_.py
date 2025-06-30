"""Agregar campo descripcion y FK genero_id a Libro

Revision ID: 912c128b9aed
Revises: df1917fbd2ca
Create Date: 2025-06-30 00:49:31.875343
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '912c128b9aed'
down_revision = 'df1917fbd2ca'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table('libro', schema=None) as batch_op:
        batch_op.add_column(sa.Column('descripcion', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('genero_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_libro_genero_id', 'genero', ['genero_id'], ['id'])


def downgrade():
    with op.batch_alter_table('libro', schema=None) as batch_op:
        batch_op.drop_constraint('fk_libro_genero_id', type_='foreignkey')
        batch_op.drop_column('genero_id')
        batch_op.drop_column('descripcion')
