from fastapi import FastAPI

app = FastAPI()

items = []


@app.get("/")
def root():
    return {"message": "Jesus is LORD"}


@app.post("/items")
def create_item(item: str):
    items.append(item)
    return items


@app.get("/get_items")
def get_items():
    return items
