from src.apy.managers.sqlManager import SqlManager
from src.apy.config import POSTGRES_URL

sql_repo = SqlManager(POSTGRES_URL)
