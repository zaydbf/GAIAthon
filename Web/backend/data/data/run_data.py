import sys
import os
# Set Django settings and path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
import django
django.setup()

import shutil

from datetime import datetime
from Sentinel_5p_Data_scripts import read_data, get_data
from data.models import Gas, Region
from Sentinel_5p_Data_scripts import read_data, get_data, calculate_avg
from data.utils import REGION_BOUNDS



def calculate(gas, region_name):
    bounds = REGION_BOUNDS.get(region_name)
    if not bounds:
        print("Unknown region")
        return 
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
    fixed_units = {
        "CH4": {"scale": 1,        "unit": "ppbv"},
        "CO":  {"scale": 1000,     "unit": "mmol/m²"},     
        "NO2": {"scale": 1_000_000,"unit": "µmol/m²"},     
        "SO2": {"scale": 1_000_000,"unit": "µmol/m²"},     
        "O3":  {"scale": 1,        "unit": "mol/m²"},      
    }
    
    rule = fixed_units.get(gas, {"scale": 1, "unit": "unit"})
    scaled_avg = round(average * rule["scale"], 2)
    if scaled_avg == 0 or scaled_avg is None:
        print("error Invalid average value")
        return 
    Gas.objects.create(
        gas=gas,
        average=scaled_avg,
        unit=rule["unit"],
        region=region,
    )

def main():
    print(f"[+] Cron job executed at {datetime.now()}")
    if os.path.exists("./data_sentinel_5p"): # delete the old data to replace with new one
        shutil.rmtree("./data_sentinel_5p")  # Recursively delete folder and all contents 
    get_data.main()
    read_data.main()
    gases = ["CO", "NO2", "CH4", "O3", "SO2"]
    for gas in gases:
        calculate(gas, "Africa")
    
    
    
    

if __name__ == "__main__":
    main()