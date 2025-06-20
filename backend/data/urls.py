from django.urls import path
from .views import calculate

urlpatterns = [
    path('calculate/<str:gas>/<str:region_name>/', calculate)
]