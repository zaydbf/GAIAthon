# Automation
Now run_data.py runs automatically everyday at midnight to update data 

# Usage 

First make an account at : https://dataspace.copernicus.eu/

Create a .env file in  where you specify : 

``` bash
COPERNICUS_USERNAME=<email>
COPERNICUS_PASSWORD=<password>
```
run the run_data.py file
``` bash
cd backend\data\data
python run_data.py
```
then for testing go to localhost/calculate/gas/Region
exemple : 
http://127.0.0.1:8000/data/calculate/NO2/Africa/
this should calculate the average of NO2 emission in africa
(visit all links to calculate the average of each gas  http://127.0.0.1:8000/data/calculate/"gas"/Africa/  where gas =[CH4, CO, NO2, O3, SO2]  
then visit the website's dashboard the added values should be visible
# Documentation for data files
first I'm going to talk about each script and what it does : 

## get_data.py 
this script connect to COPERNICUS platform to get the data using API 
so how does it work ? : 
    you need to provide the username (email) and the password.

First of all we prepare the variables (Area, credentials, time ...) for the Area we specify the Polygon using this website https://boundingbox.klokantech.com/
then we use the refresh token to connect to the website and then we get the products ids(the data taken from which satelite at what time etc ....)
then download function to download the files that contain data in /data/data_sentinel_5p folder  (.nc files )  

## read_data.py
Now we that we have the data we need to be able to read it so we use read_data.py for that 

So first we get each .nc  file and read it and save it to Pandas dataframe, then covert the pandas dataframe to csv file for readability (found in /data/CSV_data)
then we plot the data in /data/plot folder
## run_data.py
Automatically executes get_data.py and read_data.py 


