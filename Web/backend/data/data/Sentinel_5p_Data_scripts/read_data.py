import os
import h5py
import numpy as np
import pandas as pd

import matplotlib.pyplot as plt
import seaborn as sns
import cartopy.crs as ccrs
import cartopy.feature as cfeature

# get .nc files 
def get_all_nc_files(gas_dir):
    nc_files = []
    for root, dirs, files in os.walk(gas_dir):
        for file in files:
            if file.endswith('.nc'):
                nc_files.append(os.path.join(root, file))
    return nc_files

# Read .nc file, get its data for each gas and save it to Pandas dataframe

def read_s5p_file_to_dataframe(file_path,gas_key,gas_name, qa_threshold=0.75):
    with h5py.File(file_path, 'r') as f:
        # Explore available datasets under /PRODUCT
        product_group = f.get('PRODUCT')
        if product_group is None:
            raise Exception("PRODUCT group not found in the file.")

        available_vars = list(product_group.keys())
        print(f"Available PRODUCT variables: {available_vars}")

        # Extract data
        lat = product_group['latitude'][:]
        lon = product_group['longitude'][:]
        gas = product_group[gas_key][:]
        qa = product_group['qa_value'][:]

        # Flatten arrays
        lat = lat.flatten()
        lon = lon.flatten()
        gas = gas.flatten()
        qa = qa.flatten()

        # Filter by QA threshold
        mask = qa > (qa_threshold * 100)
        df = pd.DataFrame({
            'latitude': lat[mask],
            'longitude': lon[mask],
            gas_name: gas[mask],
            'qa_value': qa[mask]
        })

        return df




# Read gas files 
def read_gas_files(gas_dir, gas_key, gas_name):
    all_df_gas = []
    nc_files = get_all_nc_files(gas_dir)

    for file_path in nc_files:
        try:
            df = read_s5p_file_to_dataframe(file_path, gas_key, gas_name, qa_threshold=0.75)
            all_df_gas.append(df)   
        except Exception as e:
            print(f"Failed to process {file_path}: {e}")

    #  Concatenate all dataframes into one
    if all_df_gas:
        return pd.concat(all_df_gas, ignore_index=True)
    else:
        return pd.DataFrame()  # Return empty DataFrame if none succeeded

# Plot function 


def plot_gas_cartopy(df, gas_name, cmap='viridis', save_path=None):
    if df.empty:
        print(f"No data to plot for {gas_name}")
        return

    # Fix longitude if in [0, 360]
    if df['longitude'].max() > 180:
        df['longitude'] = ((df['longitude'] + 180) % 360) - 180

    fig = plt.figure(figsize=(10, 8))
    ax = plt.axes(projection=ccrs.PlateCarree())
    ax.set_extent([-20, 55.5, -37.2, 40.2])  # Africa AOI bounds
    ax.add_feature(cfeature.COASTLINE)
    ax.add_feature(cfeature.BORDERS)
    ax.gridlines(draw_labels=True)

    sc = ax.scatter(df['longitude'], df['latitude'], c=df[gas_name],
                    cmap=cmap, s=1, alpha=0.7, transform=ccrs.PlateCarree())

    plt.colorbar(sc, ax=ax, label=f"{gas_name} concentration")
    plt.title(f"{gas_name} Distribution over Africa")

    if save_path:
        os.makedirs(os.path.dirname(save_path), exist_ok=True)
        plt.savefig(save_path, dpi=300)
        print(f"Saved plot to {save_path}")
    else:
        plt.show()

    plt.close()

# def plot_gas_cartopy_all(df, gas_name, cmap='viridis', save_path=None):
#     if df.empty:
#         print(f"No data to plot for {gas_name}")
#         return

#     # Fix longitude if in [0, 360]
#     if df['longitude'].max() > 180:
#         df['longitude'] = ((df['longitude'] + 180) % 360) - 180

#     fig = plt.figure(figsize=(12, 6))
#     ax = plt.axes(projection=ccrs.PlateCarree())
#     # ax.set_extent(...) is removed to allow global view

#     ax.add_feature(cfeature.COASTLINE)
#     ax.add_feature(cfeature.BORDERS)
#     ax.gridlines(draw_labels=True)

#     sc = ax.scatter(df['longitude'], df['latitude'], c=df[gas_name],
#                     cmap=cmap, s=1, alpha=0.7, transform=ccrs.PlateCarree())

#     plt.colorbar(sc, ax=ax, label=f"{gas_name} concentration")
#     plt.title(f"{gas_name} Global Distribution")

#     if save_path:
#         os.makedirs(os.path.dirname(save_path), exist_ok=True)
#         plt.savefig(save_path, dpi=300)
#         print(f"Saved plot to {save_path}")
#     else:
#         plt.show()

#     plt.close()
  

def main():
    # define gasses and its directories
    gas_key_no2, gas_name_no2, gas_dir_no2 =  'nitrogendioxide_tropospheric_column', 'NO2', './data_sentinel_5p/no2_data'
    gas_key_co, gas_name_co, gas_dir_co  =  'carbonmonoxide_total_column', 'CO', './data_sentinel_5p/co_data'
    gas_key_ch4, gas_name_ch4, gas_dir_ch4  = 'methane_mixing_ratio_bias_corrected', 'CH4', './data_sentinel_5p/ch4_data'
    gas_key_o3, gas_name_o3, gas_dir_o3  = 'ozone_total_vertical_column', 'O3', './data_sentinel_5p/o3_data'
    gas_key_so2, gas_name_so2, gas_dir_so2 = 'sulfurdioxide_total_vertical_column', 'SO2', './data_sentinel_5p/so2_data'

    # define dataframe for each gas 
    df_no2 = read_gas_files(gas_dir_no2,gas_key_no2,gas_name_no2)
    df_co = read_gas_files(gas_dir_co,gas_key_co,gas_name_co)
    df_ch4 = read_gas_files(gas_dir_ch4,gas_key_ch4,gas_name_ch4)
    df_o3 = read_gas_files(gas_dir_o3,gas_key_o3,gas_name_o3) 
    df_so2 = read_gas_files(gas_dir_so2, gas_key_so2, gas_name_so2)
    print(df_no2,df_co,df_ch4,df_o3)

    # convert pandas dataframe to csv file 
    os.makedirs('./CSV_data', exist_ok=True) # Create the folder if it doesn't exist 
    df_no2.to_csv('./CSV_data/no2_data.csv', index=False)
    df_co.to_csv('./CSV_data/co_data.csv', index=False)
    df_ch4.to_csv('./CSV_data/ch4_data.csv', index=False)
    df_o3.to_csv('./CSV_data/o3_data.csv', index=False)
    df_so2.to_csv('./CSV_data/so2_data.csv', index=False)


    os.makedirs('./plot', exist_ok=True) 
    gasses = {"CH4": df_ch4, "NO2": df_no2, "CO": df_co, "O3": df_o3, "SO2": df_so2}
    for gas, df in gasses.items():
        plot_gas_cartopy(df, gas, cmap='viridis', save_path=f'./plot/{gas.lower()}_plot.png')
        # plot_gas_cartopy_all(df, gas, cmap='viridis', save_path=f'./plot/{gas.lower()}_plot_all.png')

if __name__ == "__main__" :
    main()        


