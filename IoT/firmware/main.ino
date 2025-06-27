#include "bsec.h"

#define BME680_I2C_ADDR_PRIMARY  0x76

Bsec bme;

void setup() {
  Serial.begin(115200);
  Wire.begin();

  // Initialize BSEC library on I2C address 0x76
  bme.begin(BME680_I2C_ADDR_PRIMARY, Wire);

  // Subscribe to sensors
  bsec_virtual_sensor_t sensorList[] = {
    BSEC_OUTPUT_RAW_TEMPERATURE,
    BSEC_OUTPUT_RAW_PRESSURE,
    BSEC_OUTPUT_RAW_HUMIDITY,
    BSEC_OUTPUT_IAQ,
    BSEC_OUTPUT_BREATH_VOC_EQUIVALENT
  };
  bme.updateSubscription(sensorList, 5, BSEC_SAMPLE_RATE_LP);

  Serial.println(F("BME680 + BSEC initialized \n"));
}

void loop() {
  if (bme.run()) {
    Serial.print(F("Temp: "));
    Serial.println(bme.temperature);
    Serial.print(F("Humidity: "));
    Serial.println(bme.humidity);
    Serial.print(F("Pressure: "));
    Serial.println(bme.pressure);
    Serial.print(F("VOC (bVOC): "));
    Serial.println(bme.breathVocEquivalent);
  }
  delay(100);
}
