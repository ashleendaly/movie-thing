from api.managers.sqlManager import SqlManager
from api.config import POSTGRES_URL

sql_repo = SqlManager(POSTGRES_URL)
