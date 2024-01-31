from fastapi import FastAPI, Request


from src.apy.borda import aggregate_borda
from src.apy.instance import sql_repo

app = FastAPI()

app.state.sql_repo = sql_repo


@app.get("/aggregate/{clubName}")
def aggregate(clubName: str, request: Request):
    data = request.app.state.sql_repo.get_user_preferences(clubName)
    results = aggregate_borda(data)
    return request.app.state.sql_repo.write_results(results)
