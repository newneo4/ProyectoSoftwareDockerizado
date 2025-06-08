"""insertar tipos de usuario

Revision ID: 0a17f4677e0a
Revises: a4ef1f5143bb
Create Date: 2025-05-30 01:35:40.492611

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0a17f4677e0a'
down_revision = 'a4ef1f5143bb'
branch_labels = None
depends_on = None


def upgrade():
    op.execute(
        "INSERT INTO tipo_usuario (id, nombre) VALUES (1, 'Estudiante'), (2, 'Biblioteca'), (3, 'Lector')"
    )

def downgrade():
    op.execute("DELETE FROM tipo_usuario WHERE id IN (1, 2, 3)")

