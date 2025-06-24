from django.db import models

# Create your models here.

class IotData(models.Model):
    application_id = models.CharField(max_length=100)
    dev_eui = models.CharField(max_length=100)
    f_port = models.IntegerField(null=True, blank=True)
    data = models.TextField(null=True, blank=True)

    #  object_json
    light_lux = models.FloatField(null=True, blank=True)        # analogInput[5]
    ch4_ppm = models.FloatField(null=True, blank=True)           # analogInput[6]
    co2_ppm = models.FloatField(null=True, blank=True)           # analogInput[7]
    barometer = models.FloatField(null=True, blank=True)         # barometer[4]
    humidity = models.FloatField(null=True, blank=True)          # humiditySensor[3]
    temperature = models.FloatField(null=True, blank=True)       # temperatureSensor[2]

    latitude = models.FloatField(null=True, blank=True)          # gpsLocation[1].latitude
    longitude = models.FloatField(null=True, blank=True)         # gpsLocation[1].longitude
    altitude = models.FloatField(null=True, blank=True)          # gpsLocation[1].altitude

    rx_info = models.JSONField(null=True, blank=True)
    object_json = models.JSONField(null=True, blank=True)

    timestamp = models.DateTimeField()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)  # Save the new data first

        # Automatically delete the oldest data after 7 values
        oldest_entries = IotData.objects.order_by('-timestamp')[7:]
        for entry in oldest_entries:
            entry.delete()

    def __str__(self):
        return f"L :{self.light_lux},CH4 : {self.ch4_ppm}, CO2 : {self.co2_ppm}"
    