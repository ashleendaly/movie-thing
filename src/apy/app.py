from fastapi import FastAPI

app = FastAPI()

@app.get("/apy")
def hello_world():
    return {"message": "Hello World"}


@app.get("/aggregate")
def aggregate():

    # load ranking data

    # run aggregation
    # return results
    return {"results": [1,2,3]}
