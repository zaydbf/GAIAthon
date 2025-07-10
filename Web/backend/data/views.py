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
    if average is None or average == 0:
        return Response({"error": "Invalid average value"}, status=400)

    # Final fixed scaling and unit rules
    fixed_units = {
        "CH4": {"scale": 1,        "unit": "ppbv"},
        "CO":  {"scale": 1000,     "unit": "mmol/m²"},     
        "NO2": {"scale": 1_000_000,"unit": "µmol/m²"},     
        "SO2": {"scale": 1_000_000,"unit": "µmol/m²"},     
        "O3":  {"scale": 1,        "unit": "mol/m²"},      
    }

    rule = fixed_units.get(gas, {"scale": 1, "unit": "unit"})
    scaled_avg = round(average * rule["scale"], 2)

    Gas.objects.create(
        gas=gas,
        average=scaled_avg,
        unit=rule["unit"],
        region=region,
    )

    return Response({
        "gas": gas,
        "average": scaled_avg,
        "unit": rule["unit"],
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
