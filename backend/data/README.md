# Usage 

First make an account at : https://dataspace.copernicus.eu/

Create a .env file in  where you specify : 

``` bash
COPERNICUS_USERNAME=<email>
COPERNICUS_PASSWORD=<password>
```
run the get_data.py file first then the read_data.py 
``` bash
cd backend\data\Sentinel-5p-Data_scripts
python get_data.py
python read_data.py
```
# Documentation for data files

first I'm going to talk about each script and what it does : 

## get_data.py 
this script connect to COPERNICUS platform to get the data using API 
so how does it work ? : 
    you need to provide the username (email) and the password.

First of all we prepare the variables (Area, credentials, time ...) for the Area we specify the Polygon using this website https://boundingbox.klokantech.com/
then we use the refresh token to connect to the website and then we get the products ids(the data taken from which satelite at what time etc ....)
then download function to download the files that contain data in /data/data_sentinel_5p folder  (.nc files )  

we use a for loop in main function to download all the needed gases

## read_data.py
Now we that we have the data we need to be able to read it so we use read_data.py for that 

So first we get each .nc  file and read it and save it to Pandas dataframe, then covert the pandas dataframe to csv file for readability (found in /data/CSV_data)
then we plot the data in /data/plot folder



