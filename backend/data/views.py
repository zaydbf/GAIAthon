from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import random
from .models import Region, Gas
from .data.Sentinel_5p_Data_scripts import read_data, get_data, calculate_avg
from .utils import REGION_BOUNDS
from django.http import HttpResponseBadRequest
# Create your views here.


def data(request):
    read_data.main()
    get_data.main()

@api_view(['GET'])
def calculate(request, gas, region_name):
    bounds = REGION_BOUNDS.get(region_name)
    if not bounds:
        return HttpResponseBadRequest("Unknown region")

    region, _ = Region.objects.get_or_create(
        name=region_name,
        defaults={
            "lat_min": bounds["lat_min"],
            "lat_max": bounds["lat_max"],
            "lon_min": bounds["lon_min"],
            "lon_max": bounds["lon_max"],
        }
    )
    average = calculate_avg.compute_average(gas, region)
    # Later you can calculate the average and unit
    if gas == "CH4" :
        unit = "ppbv"
    else :    
        unit="mol/m²"
    Gas.objects.create(
        gas=gas,
        average=average, 
        unit = unit,
        region=region,
    )

    return Response({
        "gas": gas,
        "average": average,
        "unit": unit,
        "region": region_name
    })

@api_view(['GET'])
def get_gas_values(request, gas, region_name):
    
    values = [61.6, 29.33, 24.15, 229.71, 249.37, 224.17, 250.26]

    return Response({
        "gas": gas,
        "region": region_name,
        "values": values,
        "unit": "ppm"  
    })
