'''
Наперед є підготовленою таблична структура даних з пакету pandas, що має ім'я players. Вона містить стовпчики з ідентифікаторами (id), іменами (name), висотою (height), вагою (weight), кількістю забитих голів (goals). Виділити з цієї структури тих гравців, які мають зріст вище 190, вагу більше 100. А тоді з цих результатів визначити ідентифікатор гравця, який забив найбільшу кількість голів.
'''

import pandas 
players={
"id":[0,1,2,3],
"name":['John','Micah','Peter','Jonah'],
"height":[183,175,195,193],
"weight":[79,63,103,121],
"goals":[12,7,40,21],
}
df=pandas.DataFrame(players)
print("\nData\n",df)
selected=df.query('height>=190 and weight>=100')
print("\nSelected\n",selected)
goaler=selected.nlargest(1,'goals')
print("\nGoaler\n",goaler)