from . import views
from django.urls import path


urlpatterns=[
    path('members/',views.members,name='members')
]