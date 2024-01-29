from typing import List
from fastapi import FastAPI, Request

from src.apy.instance import sql_repo

app = FastAPI()

app.state.sql_repo = sql_repo

@app.get("/apy")
def hello_world():
    return {"message": "Hello World"}


@app.get("/aggregate")
def aggregate():

    # load ranking data

    # run aggregation
    # return results
    return {"results": [1,2,3]}

@app.get("/clubmembers/{clubName}")
def get_club_members(clubName: str, request: Request) -> List[str]:
    return request.app.state.sql_repo.get_club_members(clubName)