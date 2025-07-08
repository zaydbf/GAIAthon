from django.urls import path
from .views import get_iot_data, get_average_iot_data

urlpatterns = [
    path('get-iot-data/<str:gas>/', get_iot_data),
    path('get-avg-iot-data', get_average_iot_data)
]