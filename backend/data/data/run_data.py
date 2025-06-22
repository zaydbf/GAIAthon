import shutil
import os
from datetime import datetime
from Sentinel_5p_Data_scripts import read_data, get_data
def main():
    print(f"[+] Cron job executed at {datetime.now()}")
    if os.path.exists("./data_sentinel_5p"): # delete the old data to replace with new one
        shutil.rmtree("./data_sentinel_5p")  # Recursively delete folder and all contents 
    get_data.main()
    read_data.main()
    
    
    
    

if __name__ == "__main__":
    main()