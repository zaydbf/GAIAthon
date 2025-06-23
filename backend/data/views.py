from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
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
    unit_multipliers = {
        "CH4": (1, "ppbv"),
        "CO": (1000, "mmol/m²"),
        "NO2": (1000000, "µmol/m²"),
        "O3": (1000000, "µmol/m²"),
        "SO2": (1000000, "µmol/m²"),
    }
    
    multiplier, unit = unit_multipliers.get(gas, (1, "unit"))
    scaled_avg = round(average * multiplier, 2)
    if scaled_avg == 0 or scaled_avg is None:
        return Response({"error": "Invalid average value"}, status=400)
    Gas.objects.create(
        gas=gas,
        average=scaled_avg, 
        unit = unit,
        region=region,
    )

    return Response({
        "gas": gas,
        "average": scaled_avg,
        "unit": unit,
        "region": region_name
    })

@api_view(['GET'])
def get_gas_values(request, gas, region_name):
    
    region = Region.objects.filter(name=region_name).first()
    if not region:
        return HttpResponseBadRequest("Region not found")

    # Get last 6 previous values
    previous = Gas.objects.filter(gas=gas, region=region).order_by('-id')[1:7]
    previous_values = list(reversed([g.average for g in previous]))

    # Get the latest one (today’s)
    latest = Gas.objects.filter(gas=gas, region=region).order_by('-id').first()
    if not latest:
        return HttpResponseBadRequest("No data found")

    # Append the new average
    updated_values = previous_values + [latest.average]

    return Response({
        "gas": gas,
        "region": region_name,
        "values": updated_values,
        "unit": latest.unit
    })
