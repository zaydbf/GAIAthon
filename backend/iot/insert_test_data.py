import os
import sys
import django
from datetime import datetime

sys.path.append("/workspaces/GAIAthon/backend")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from iot.models import IotData

# Sample hardcoded insert
IotData.objects.create(
    application_id="8527939a-379f-4603-95dc-9436798673ce",
    dev_eui="1100ffeeddccbbaa",
    f_port=1,
    data="AYgFncEBjbcAE4gCZwEJA2huBHMniAUCG7wHApxABgINZQ==",  
    light_lux=71,
    ch4_ppm=45.2,
    co2_ppm=34.29,
    barometer=1010,
    humidity=55,
    temperature=26.5,
    latitude=36.8065,
    longitude=10.1815,
    altitude=50,
    timestamp=datetime.utcnow(),
    rx_info={},  # Can leave as empty JSON
    object_json={},  # Can leave as empty JSON
)

print("[INFO] Hardcoded data inserted.")
