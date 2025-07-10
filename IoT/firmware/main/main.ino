#include <lmic.h>
#include <hal/hal.h>
#include <SPI.h>
#include <TinyGPS.h>
#include <CayenneLPP.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME680.h>
#include <Adafruit_TSL2591.h>
// co2 sensor
#define MG811_PIN A1
#define CO2_FALLBACK_PPM 400  // Static value if sensor not working
const float V_zero = 0.45;
const float sensitivity = -0.0035; 
//----MQ4
#define MQ4_PIN A0        // Analog input pin
#define RL_VALUE 10.0     // Load resistor value in kOhm
float Ro = 10.0;          // Initial Ro, will be calculated
bool calibrated = false;  // Set to true after calibration
#define CH4_FALLBACK_PPM 12  // Static value if sensor not working
//-----
// OTAA credentials (REVERSED for LMIC!)
static const u1_t PROGMEM DEVEUI[8] = { 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x00, 0x11 };
static const u1_t PROGMEM APPEUI[8] = { 0x22, 0x33, 0x44, 0x55, 0x66, 0x77, 0x88, 0x99 };
static const u1_t PROGMEM APPKEY[16] = {
  0x12, 0x34, 0x56, 0x78, 0x9A, 0xBC, 0xDE, 0xF0,
  0x01, 0x23, 0x45, 0x67, 0x89, 0xAB, 0xCD, 0xEF
};

void os_getArtEui(u1_t* buf) { memcpy_P(buf, APPEUI, 8); }
void os_getDevEui(u1_t* buf) { memcpy_P(buf, DEVEUI, 8); }
void os_getDevKey(u1_t* buf) { memcpy_P(buf, APPKEY, 16); }

// LMIC pin mapping for Dragino LoRa GPS Shield on Mega
const lmic_pinmap lmic_pins = {
  .nss = 10,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 9,
  .dio = {2, 6, 7}
};

// GPS (on Serial1)
#define ss Serial1
TinyGPS gps;
float flat, flon, falt;
unsigned long age;
bool gpsAvailable = false;

// BME680
Adafruit_BME680 bme;
bool bmeAvailable = false;

// TSL2591
Adafruit_TSL2591 tsl = Adafruit_TSL2591(2591);
bool tslAvailable = false;

// CayenneLPP
CayenneLPP lpp(51);
static osjob_t sendjob;
const unsigned TX_INTERVAL = 100;  // 15 minutes

// Fallback static values
const float FALLBACK_LAT = 36.8065;
const float FALLBACK_LON = 10.1815;
const float FALLBACK_ALT = 50.0;

const float FALLBACK_TEMP = 26.5;
const float FALLBACK_HUMIDITY = 55.0;
const float FALLBACK_PRESSURE = 1012.0;
const float FALLBACK_LIGHT = 350.0;

void GPSRead() {
  gps.f_get_position(&flat, &flon, &age);
  falt = gps.f_altitude();
  gpsAvailable = (flat != TinyGPS::GPS_INVALID_F_ANGLE && flon != TinyGPS::GPS_INVALID_F_ANGLE);
}

void do_send(osjob_t* j) {
  lpp.reset();

  // --- GPS
  GPSRead();
  if (gpsAvailable) {
    Serial.println(F("Using real GPS"));
    lpp.addGPS(1, flat, flon, falt);
  } else {
    Serial.println(F("Using fallback GPS"));
    lpp.addGPS(1, FALLBACK_LAT, FALLBACK_LON, FALLBACK_ALT);
  }

  // --- BME680
  if (bmeAvailable && bme.performReading()) {
    Serial.println(F("Using real BME680"));
    lpp.addTemperature(2, bme.temperature);
    lpp.addRelativeHumidity(3, bme.humidity);
    lpp.addBarometricPressure(4, bme.pressure / 100.0);
  } else {
    Serial.println(F("Using fallback BME680 values"));
    lpp.addTemperature(2, FALLBACK_TEMP);
    lpp.addRelativeHumidity(3, FALLBACK_HUMIDITY);
    lpp.addBarometricPressure(4, FALLBACK_PRESSURE);
  }

  // --- TSL2591
  if (tslAvailable) {
    uint16_t luminosity = tsl.getLuminosity(TSL2591_VISIBLE);
    Serial.print(F("Using real TSL light = ")); Serial.println(luminosity);
    lpp.addLuminosity(5, luminosity);  // Channel 1 for luminosity
    //lpp.addAnalogInput(5, luminosity);
  } else {
    Serial.println(F("Using fallback TSL2591 light"));
    lpp.addLuminosity(5, FALLBACK_LIGHT);
  }


  // --- MG-811 CO2 Reading ---
  int mg811ADC = analogRead(MG811_PIN);
  float mg811Voltage = mg811ADC * (5.0 / 1023.0);
  float co2ppm;

  if (mg811Voltage < 0.1 || mg811Voltage > 3.0) {  // Likely disconnected or invalid
    Serial.println(F("MG-811 not detected or invalid reading. Using fallback."));
    co2ppm = CO2_FALLBACK_PPM;
  } else {
    co2ppm = getMG811PPM(mg811ADC);
    Serial.print(F("MG-811 CO₂ PPM: "));
    Serial.println(co2ppm);
  }
  co2ppm =co2ppm / 100;
  lpp.addAnalogInput(7, co2ppm);  // Cayenne channel 7: CO2

     // --- MQ-4 PPM Calculation ---
  float mq4ppm;

  int mq4ADC = analogRead(MQ4_PIN);
  float mq4V = getMQ4Voltage(mq4ADC);
  float mq4Rs = getMQ4Rs(mq4V);
   if (mq4V < 0.1 || mq4V > 5.0) {  // Likely disconnected or invalid
    Serial.println(F("MQ-4 not detected or invalid reading. Using fallback."));
    mq4ppm = CH4_FALLBACK_PPM;
  } else {
    mq4ppm = getMQ4PPM(mq4Rs, Ro);
    Serial.print(F("MQ-4 CH₄ PPM: "));
    Serial.println(mq4ppm);
  }
  lpp.addAnalogInput(6, mq4ppm);  // Cayenne channel 6: CH₄ in ppm
  // --- Send data---
  LMIC_setTxData2(1, lpp.getBuffer(), lpp.getSize(), 0);
  Serial.println(F("LoRa packet queued"));
}

void onEvent(ev_t ev) {
  Serial.print(os_getTime());
  Serial.print(F(": "));
  switch (ev) {
    case EV_JOINING: Serial.println(F("Joining...")); break;
    case EV_JOINED:
      Serial.println(F("Joined!"));
      os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(5), do_send);
      break;
    case EV_TXCOMPLETE:
      Serial.println(F("TX complete"));
      os_setTimedCallback(&sendjob, os_getTime() + sec2osticks(TX_INTERVAL), do_send);
      break;
    default:
      Serial.print(F("Event: ")); Serial.println(ev); break;
  }
}
float getMQ4Voltage(int analogValue) {
  return analogValue * (5.0 / 1023.0);
}

float getMQ4Rs(float vrl) {
  return (5.0 - vrl) * RL_VALUE / vrl;
}

float getMQ4PPM(float rs, float ro) {
  float ratio = rs / ro;
  return pow(10, (-0.38 * log10(ratio) + 1.5));
}
float getMG811PPM(int analogValue) {
  float voltage = analogValue * (5.0 / 1023.0);  // Convert to volts
  //float ppm = 116.6020682 * pow(voltage, -2.769034857);
  float deltaV = voltage - V_zero;
  float ppm = deltaV / sensitivity + 400; // 400 ppm = base CO2 air pur
  return ppm;
}

void setup() {
  Serial.begin(115200);
  ss.begin(9600);
  Serial.println(F("Starting LoRa GPS Tracker with fallback values..."));
  // --- MQ4
  pinMode(MQ4_PIN, INPUT);
  // --- BME680 Init
  if (bme.begin()) {
    bmeAvailable = true;
    bme.setTemperatureOversampling(BME680_OS_8X);
    bme.setHumidityOversampling(BME680_OS_2X);
    bme.setPressureOversampling(BME680_OS_4X);
    bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
    bme.setGasHeater(320, 150);
    Serial.println(F("BME680 detected"));
  } else {
    Serial.println(F("BME680 not found, using fallback"));
  }
 
  // --- TSL2591 Init
  if (tsl.begin()) {
    tslAvailable = true;
    tsl.setGain(TSL2591_GAIN_MED);
    tsl.setTiming(TSL2591_INTEGRATIONTIME_100MS);
    Serial.println(F("TSL2591 detected"));
  } else {
    Serial.println(F("TSL2591 not found, using fallback"));
  }

 

  os_init();
  LMIC_reset();
  LMIC_startJoining();
}

void loop() {
  while (ss.available()) {
    gps.encode(ss.read());
  }
    // Calibrate MQ-4 Ro in clean air (only once)
  if (!calibrated) {
    long rs_total = 0;
    const int samples = 50;
    for (int i = 0; i < samples; i++) {
      int adc = analogRead(MQ4_PIN);
      float vrl = getMQ4Voltage(adc);
      float rs = getMQ4Rs(vrl);
      rs_total += rs;
      delay(100);
    }
    Ro = rs_total / (float)samples;
    Serial.print(F("Calibrated Ro = "));
    Serial.print(Ro, 2);
    Serial.println(F(" kΩ"));
    calibrated = true;
  }

  os_runloop_once();
}
