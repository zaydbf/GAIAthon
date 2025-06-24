from django.db import models
# Create your models here.

class Region(models.Model):
    name = models.CharField(max_length=100, unique=True)
    lat_min = models.FloatField()
    lat_max = models.FloatField()
    lon_min = models.FloatField()
    lon_max = models.FloatField()

    def __str__(self):
        return self.name
    
class Gas(models.Model):
    Gas_CHOICES = [
        ("CH4", "Methane"),
        ("CO", "Carbon Monoxide"),
        ("NO2", "Nitrogen Dioxide"),
        ("O3", "Ozone"),
        ("SO2","Sulfur Dioxide")
    ]
    gas = models.CharField(max_length=4, choices=Gas_CHOICES)
    average = models.FloatField()
    unit = models.CharField(max_length=100)
    region = models.ForeignKey(Region, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)  # YYYY-MM-DD HH:MM:SS
    def __str__(self):
        return f"{self.gas} - {self.region.name} - {self.average:.2f} {self.unit}"
    
    