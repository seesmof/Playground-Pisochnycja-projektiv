from django.db import models

class Member(models.Model):
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    phone=models.IntegerField(null=True)
    joined_date=models.DateField(null=True)

    def __str__(self) -> str:
        return f'{self.first_name} {self.last_name}'