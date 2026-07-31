from django.http import HttpResponse, JsonResponse
from django.shortcuts import render


# Create your views here.
def index(req):
    data = {"message": "Jesus is LORD", "status": 200}
    return JsonResponse(data)
