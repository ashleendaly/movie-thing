import os
from os.path import abspath, join
from dotenv import load_dotenv

ROOT_DIR = os.path.dirname(abspath(__file__))
ENV = join(ROOT_DIR, "../../.env")
load_dotenv(ENV)

POSTGRES_URL = os.environ.get("POSTGRES_URL_PYTHON")
