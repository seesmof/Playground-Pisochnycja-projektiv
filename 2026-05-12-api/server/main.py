from fastapi import FastAPI, HTTPException

app = FastAPI()

items = []


@app.get("/")
def root():
    return {"message": "Jesus is LORD"}


@app.post("/create_item")
def create_item(item: str):
    items.append(item)


@app.get("/get_items")
def get_items():
    return items


@app.get("/get_item/{item_id}")
def get_item(item_id: int) -> str:
    if item_id < len(items):
        return items[item_id]
    else:
        raise HTTPException(status_code=404, detail=f"Item {item_id} not found")
