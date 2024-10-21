from django.db import models 
class Car(models.Model):
    maker=Maker()
    model_name=models.CharField()
    FUEL_TYPES={
        GAS: "Gas",
        ELECTRIC: "Electric"
    }
    fuel_type=models.CharField(choices=FUEL_TYPES,default=GAS)
    zero_to_60=models.IntegerField()
class Maker(models.Model):
    name=models.CharField()