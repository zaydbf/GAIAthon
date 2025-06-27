{
 "cells": [
  {
   "cell_type": "markdown",
   "id": "4261edc9-d264-4b45-a978-f20ea1134580",
   "metadata": {},
   "source": [
    " \n",
    " #    An IoT-Based System to Measure Methane and Carbon Dioxide Emissions Along with Temperature and Humidity in Industrial sites\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "d80d36cb-55c8-45b1-8bd5-6c9276db6b48",
   "metadata": {},
   "source": [
    "<div style=\"text-align:center\"><img src=\"./imgs/endnode.jpeg\" width=\"50%\" /></div>"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "960adb78-49f6-4759-99e8-b46922ecb5e2",
   "metadata": {},
   "source": [
    "## Overview\n",
    "\n",
    "\n",
    "The IoT system collects real-time environmental data and communicates through a LoRaWAN gateway to a ChirpStack network server.\n",
    "\n",
    "The collected data includes:\n",
    "  - Atmospheric metrics (temperature, humidity, pressure),\n",
    "  - Gas concentrations (CO₂ and CH₄),\n",
    "  - Light intensity, and\n",
    "  - GPS location. "
   ]
  },
  {
   "cell_type": "markdown",
   "id": "d6459217-be42-4929-8035-a5210a079c3f",
   "metadata": {},
   "source": [
    "## Architecture Overview\n",
    "\n",
    "The IoT system is composed of three main components:\n",
    "\n",
    "1.  The LoRa End node\n",
    "2.  The LoRaWAN Gateway\n",
    "3.  The Network stack: ChirpStack\n",
    "\n",
    "\n",
    "\n",
    "<div style=\"text-align:center\"><img src=\"./imgs/iot-architecture.png\" width=\"90%\" /></div>"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "7613ce10-146c-4c97-9f90-586bb7a046f5",
   "metadata": {},
   "source": [
    "## Hardware Setup"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "31b3e0c1-6e11-491f-acc4-1f1d296f57f5",
   "metadata": {},
   "source": [
    "### Conceptual Block Diagram "
   ]
  },
  {
   "cell_type": "markdown",
   "id": "5a3f7f59-c23e-4375-939f-24dab547a94b",
   "metadata": {},
   "source": [
    "<div style=\"text-align:center\"><img src=\"./imgs/block-diagram.png\" width=\"70%\" /></div>"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "781b7852-179a-4cf6-8482-fe9a87004551",
   "metadata": {},
   "source": [
    "###  Pinout Table\n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "7c6ffb26-33f6-488c-bc59-7fe38e84ea0f",
   "metadata": {},
   "source": [
    "| **Component**        |           **Dragino LoRa GPS Shield**                               |\n",
    "| ---------------------| ----------------------------------------------------------------------------------|\n",
    "| Output  | GPS (Longitude, Latitude) |\n",
    " | Interface   | SPI / UART  |\n",
    " | Arduino Mega Pins    | SPI: 10 (NSS), 9 (RST), 2 (DIO0), 6 (DIO1), 7 (DIO2) <br> UART: 18 (TX1), 19 (RX1) |"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "d99bc443-1117-44ef-94cd-28748eb65a7c",
   "metadata": {},
   "source": [
    "| **Component**        |           **MQ-4**    |\n",
    "| ---------------------|:-----------------------------------------:|\n",
    "|   Output            |   Methane (CH4)                | \n",
    " | Interface   | Analog  |\n",
    "|   Arduino Mega Pins  | A0                  |\n",
    "|   Power  | VCC (5V), GND                   |"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "42b7e6f8-c47d-4290-a675-8980db1ceb12",
   "metadata": {},
   "source": [
    "| **Component**        |           **MG-811**    |\n",
    "| ---------------------|:-----------------------------------------:|\n",
    "|   Output            |   Carbon Dioxide (CO2)                | \n",
    " | Interface   | Analog  |\n",
    "|   Arduino Mega Pins  | A1                  |\n",
    "|   Power  | VCC (9V, External), GND                   |"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "b0241b7f-008a-40ed-b787-67fb721c2389",
   "metadata": {},
   "source": [
    "| **Component**        |           **BME680**    |\n",
    "| ---------------------|:-----------------------------------------:|\n",
    "|   Outputs            |  Temperature, Humidity, Pressure              | \n",
    " | Interface   | I2C  |\n",
    "|   Arduino Mega Pins  | I2C:  SDA: 20, SCL: 21                   |\n",
    "|   Power  | VCC (3.3V), GND                   |"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "3a6ca7f1-b7d1-4208-b15b-ab03fa3374f3",
   "metadata": {},
   "source": [
    "| **Component**        |           **TSL2591**    |\n",
    "| ---------------------|:-----------------------------------------:|\n",
    "|   Output             |  Luminosity               | \n",
    " | Interface   | I2C  |\n",
    "|   Arduino Mega Pins  | I2C:  SDA: 20, SCL: 21                   |\n",
    "|   Power  | VCC (3.3V), GND                   |"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "d8ff02e3-c037-4ac5-8604-1fa150732629",
   "metadata": {},
   "source": [
    "## Main Features\n",
    "\n",
    "\n",
    "The IoT system is designed for robust, low-power environmental monitoring using LoRaWAN and a modular network stack. Below is a breakdown of its core features:\n",
    "\n",
    "- End Node Features:\n",
    "\n",
    "  - Built on Arduino Mega for expanded memory and I/O capability.\n",
    "  - Integrate a Dragino LoRa/GPS Shield for seamless LoRaWAN communication and GPS tracking.\n",
    "  - Supports LoRaWAN OTAA (Over-The-Air Activation) for secure device registration and join requests.\n",
    "  - Uses CayenneLPP payload encoding, ensuring efficient and interoperable sensor data transmission.\n",
    "  - Environmental Sensing:\n",
    "     - MG-811: Analog CO₂ gas sensor for air quality monitoring.\n",
    "     - MQ-4: Methane (CH₄) gas sensor for detecting flammable gases.\n",
    "     - BME680: Measures temperature, humidity, pressure, and air quality.\n",
    "     - TSL2591: High dynamic range ambient light sensor for lux intensity.\n",
    "\n",
    "- LoRa Gateway Features:\n",
    "\n",
    "   - Tested Dragino LPS8 LoRaWAN Gateway.\n",
    "   - LoRa packet reception over 868 MHz band (Europe).\n",
    "   - Use Semtech UDP packet forwarder.\n",
    "\n",
    "- Network Stack (ChirpStack) Features:\n",
    "\n",
    "-  ChirpStack official docker compose stack (V4) from : https://github.com/brocaar/chirpstack-docker.git, contains the following services :\n",
    "\n",
    "   - chirpstack  \n",
    "   - chirpstack-gateway-bridge-eu868 \n",
    "   - chirpstack-rest-api  \n",
    "   - postgres\n",
    "   - redis\n",
    "   - mosquitto\n",
    " "
   ]
  },
  {
   "cell_type": "markdown",
   "id": "918feeb4-a373-47db-9b18-c5d9e16e1ade",
   "metadata": {},
   "source": [
    "## Payload Mapping (CayenneLPP)\n",
    "\n",
    "- We used Cayenne LPP coding to send the data payload.\n",
    "- the CayenneLPP payload includes these sensor data fields (with their Cayenne channel numbers):\n",
    "\n",
    "\n",
    "| Channel | Sensor/Data Type              |  \n",
    "| ------- | ----------------------------- | \n",
    "| 1       | GPS (lat, lon, alt)           |  \n",
    "| 2       | Temperature                   |  \n",
    "| 3       | Relative Humidity             |  \n",
    "| 4       | Barometric Pressure           |  \n",
    "| 5       | Luminosity (Light Lux)      |  \n",
    "| 6       | Analog Input (MQ-4 CH4 ppm)   |  \n",
    "| 7       | Analog Input (MG-811 CO2 ppm) |  \n"
   ]
  },
  {
   "cell_type": "markdown",
   "id": "dbbb322f-6118-4bbb-bfd6-a9113e65e23e",
   "metadata": {},
   "source": [
    "## Firmware\n",
    "\n",
    "The `firmware/` folder contains the Arduino sketch for the end node.\n",
    "\n",
    "\n",
    "### Required Libraries \n",
    "\n",
    "\n",
    "| Sensor/Function    | Library Used                          | Purpose                           |\n",
    "| ------------------ | ------------------------------------- | --------------------------------- |\n",
    "| LoRaWAN (OTAA)     | `lmic`, `hal`                         | Join/send LoRa packets            |\n",
    "| GPS (NMEA parsing) | `TinyGPS`                             | Get latitude, longitude, altitude |\n",
    "| Cayenne Payload    | `CayenneLPP`                          | Encode sensor data compactly      |\n",
    "| I2C Interface      | `Wire`                                | Communication with I2C sensors    |\n",
    "| BME680             | `Adafruit_BME680`, `Adafruit_Sensor`  | Temp, humidity, pressure, gas     |\n",
    "| TSL2591            | `Adafruit_TSL2591`, `Adafruit_Sensor` | Light intensity (IR + visible)    |\n",
    "\n",
    "\n",
    "### Firmware Features\n",
    "\n",
    "- Initializes all I2C/analog sensors\n",
    "- Reads temperature, humidity, pressure, light, and gas concentrations\n",
    "- Parses GPS data over Serial1\n",
    "- Encodes payload using CayenneLPP format\n",
    "- Sends data over LoRaWAN using OTAA"
   ]
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python (System)",
   "language": "python",
   "name": "system-python"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.13.1"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}
