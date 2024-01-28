from fastapi import FastAPI

app = FastAPI()

@app.get("/apy")
def hello_world():
    return {"message": "Hello World"}