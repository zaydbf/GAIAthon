FROM python:3.13.4-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "/app/iot/mqtt_listener.py"]
