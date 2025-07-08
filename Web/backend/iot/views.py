from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseBadRequest
from .models import IotData
from django.db.models import Avg
# Create your views here.

# @api_view(['GET'])
# def get_iot_data(request):
#     latest = IotData.objects.order_by('-timestamp').first()
#     if not latest:
#         return Response({"message": "No IoT data available."}, status=404)

#     return Response({
#         "Light lux": latest.light_lux,
#         "CH4 ppm": latest.ch4_ppm,
#         "CO2 ppm": latest.co2_ppm,
#         "Barometer": latest.barometer,
#         "Humidity": latest.humidity,
#         "Temperature": latest.temperature,
#         "Latitude": latest.latitude,
#         "Longitude": latest.longitude,
#         "Altitude": latest.altitude,
#     })

@api_view(['GET'])
def get_iot_data(request, gas):
    field_map = {
        'CO2': 'co2_ppm',
        'Light': 'light_lux',
        'CH4': 'ch4_ppm',
    }
    if gas not in field_map:
        return HttpResponseBadRequest("Gas not supported")

    field_name = field_map[gas]
    queryset = IotData.objects.order_by('-timestamp')

    # Get previous 6 values (skip latest) and latest one
    previous = list(queryset.values_list(field_name, flat=True)[1:7])
    previous = [v for v in reversed(previous) if v is not None] 

    latest = queryset.values_list(field_name, flat=True).first()
    if latest is None:
        return HttpResponseBadRequest("No data found")

    values = previous + [latest]

    return Response({
        "gas": gas,
        "values": values,
        "unit": {
            "CO2": "ppm",
            "Light": "lux",
            "CH4": "ppm"
        }[gas]
    })

@api_view(['GET'])
def get_average_iot_data(request):
    averages = IotData.objects.aggregate(
        avg_barometer=Avg('barometer'),
        avg_humidity=Avg('humidity'),
        avg_temperature=Avg('temperature'),
        avg_latitude=Avg('latitude'),
        avg_longitude=Avg('longitude'),
        avg_altitude=Avg('altitude'),
    )
    return Response(averages)   