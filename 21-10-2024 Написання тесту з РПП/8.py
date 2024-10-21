from django.http import HttpResponse
from django.db import models 

class Movie(models.Model):
    title=models.CharField()
    rating=models.FloatField()
    release=DateTimeField()
    countries=["USA","UK","Ukraine"]

def movies(request): 
    return HttpResponse([movie for movie in get_movies()[:5] if movie.release.year==2021])