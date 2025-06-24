from django.urls import path
from .views import calculate, get_gas_values

urlpatterns = [
    path('calculate/<str:gas>/<str:region_name>/', calculate),
    path('get-data/<str:gas>/<str:region_name>/', get_gas_values)
]