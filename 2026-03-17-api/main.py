from fastapi import FastAPI

app = FastAPI()


class Status:
    OK = 200
    NOT_FOUND = 404


@app.get("/")
def root():
    data = {"message": "Jesus is LORD", "status": Status.OK}
    return data
