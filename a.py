from dataclasses import dataclass


@dataclass
class IData:
    name: str
    description: str
    price: int


newItem = IData(name="iPhone 15", description="A good looking phone.", price=1000)

print(newItem)
