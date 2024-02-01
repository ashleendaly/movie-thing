from src.api.managers.sqlManager import SqlManager
from src.api.config import POSTGRES_URL

sql_repo = SqlManager(POSTGRES_URL)
