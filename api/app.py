from fastapi import FastAPI, Request


from src.api.borda import aggregate_borda
from src.api.instance import sql_repo

app = FastAPI()

app.state.sql_repo = sql_repo


@app.get("/api/aggregate/{clubName}")
def aggregate(clubName: str, request: Request):
    data = request.app.state.sql_repo.get_user_preferences(clubName)
    results = aggregate_borda(data)
    return request.app.state.sql_repo.write_results(clubName, results)
