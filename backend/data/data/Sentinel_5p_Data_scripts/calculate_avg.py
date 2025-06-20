import pandas as pd

import os
# gases = ["CH4", "CO", "NO2", "O3"] 
# for gas in gases :
# # Load your CSV file
#     df = pd.read_csv(f"./CSV_data/{gas.lower()}_data.csv")  # Replace with actual path

# # Filter for African bounds (approximate)
#     africa_df = df[
#         (df['latitude'] >= -35) & (df['latitude'] <= 37) &
#         (df['longitude'] >= -20) & (df['longitude'] <= 55)
#     ]
#     africa_df = africa_df[africa_df[gas] > 0]
# # Compute the average concentration
#     average = africa_df[gas].mean()
#     if gas == "CH4":
#         unit  = "ppbv"
#     else :
#         unit = "mol/m²"    
#     print(f"Average {gas} in Africa: {average} {unit}")
    
# region = {"lat_min": -35, "long_min": -20, "lat_max": 37, "long_max": 55}
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def compute_average(gas, region):
    csv_path = os.path.join(BASE_DIR, "CSV_data", f"{gas.lower()}_data.csv")
    df = pd.read_csv(csv_path)

# Filter for region bounds (approximate)
    region_df = df[
        (df['latitude'] >= region.lat_min) & (df['latitude'] <= region.lat_max) &
        (df['longitude'] >= region.lon_min) & (df['longitude'] <= region.lon_max)
    ]
    region_df = region_df[region_df[gas] > 0]
# Compute the average concentration
    average = region_df[gas].mean()
    return average
    # if gas == "CH4":
    #     unit  = "ppbv"
    # else :
    #     unit = "mol/m²"    
    # print(f"Average {gas} in Africa: {average} {unit}")

