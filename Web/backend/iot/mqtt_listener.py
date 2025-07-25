import sys
import os

# Add the parent directory of 'backend' to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import django
import json
import paho.mqtt.client as mqtt
from datetime import datetime
import time
from dotenv import load_dotenv

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from iot.models import IotData
from django.utils import timezone

load_dotenv()




  

# --- MQTT Setup ---
MQTT_BROKER = os.getenv("MQTT_BROKER")
MQTT_PORT = int(os.getenv("MQTT_PORT", 1883)) 
MQTT_TOPIC = os.getenv("MQTT_TOPIC")

def on_connect(client, userdata, flags, rc, properties):
    print(f"[MQTT] Connected with result code {rc}")
    client.subscribe(MQTT_TOPIC)
    print(f"[MQTT] Subscribed to topic: {MQTT_TOPIC}")

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        print(f"[MQTT] Received message on {msg.topic}")

        object_data = payload.get("object", {})
        gps = object_data.get("gpsLocation", {}).get("1", {})

        iot_entry = IotData(
            application_id = payload.get("deviceInfo", {}).get("applicationId"),
            dev_eui = payload.get("deviceInfo", {}).get("devEui"),
            f_port = payload.get("fPort"),
            data = payload.get("data"),
            rx_info = payload.get("rxInfo"),
            object_json = object_data,
            light_lux = object_data.get("illuminanceSensor", {}).get("5"),
            ch4_ppm = object_data.get("analogInput", {}).get("6") * 1000,
            co2_ppm = round(object_data.get("analogInput", {}).get("7") * 10, 2),
            barometer = object_data.get("barometer", {}).get("4"),
            humidity = object_data.get("humiditySensor", {}).get("3"),
            temperature = object_data.get("temperatureSensor", {}).get("2"),
            latitude = gps.get("latitude"),
            longitude = gps.get("longitude"),
            altitude = gps.get("altitude"),
            timestamp = timezone.now()
        )

        iot_entry.save()
        print("[Django ORM] Saved to database.")
    except Exception as e:
        print(f"[Error] {e}")

# --- MQTT Client Setup ---
mqtt_client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
mqtt_client.on_connect = on_connect
mqtt_client.on_message = on_message

mqtt_client.connect(MQTT_BROKER, MQTT_PORT, 60)
print("[System] Starting MQTT loop ...")
mqtt_client.loop_forever()
print("[System] Exiting.")