import h5py
import numpy as np

file_path = "ch4_data/Sentinel5P_CH4_62c25847-5b79-46c3-98b7-53de5aacd9e5.nc"

with h5py.File(file_path, "a") as f:  # "a" mode = read/write
    product_group = f.get("PRODUCT")
    if product_group is None:
        product_group = f.create_group("PRODUCT")

    # Example dimensions
    shape = (100, 100)  # Adjust shape to match or create new datasets
    
    # Overwrite or create latitude
    if "latitude" in product_group:
        del product_group["latitude"]
    product_group.create_dataset("latitude", data=np.random.uniform(-90, 90, size=shape[0]*shape[1]).reshape(shape))

    # Overwrite or create longitude
    if "longitude" in product_group:
        del product_group["longitude"]
    product_group.create_dataset("longitude", data=np.random.uniform(-180, 180, size=shape[0]*shape[1]).reshape(shape))

    # Overwrite or create gas data
    if "methane_mixing_ratio_bias_corrected" in product_group:
        del product_group["methane_mixing_ratio_bias_corrected"]
    product_group.create_dataset("methane_mixing_ratio_bias_corrected", data=np.random.rand(*shape)*2000)

    # Overwrite or create QA values
    if "qa_value" in product_group:
        del product_group["qa_value"]
    product_group.create_dataset("qa_value", data=np.full(shape, 1.0))  # All pass QA

print("Test data injected.")
