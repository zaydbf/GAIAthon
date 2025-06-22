FROM python:3.13.4-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN apt-get update && apt-get install -y cron

# Add cron job to run the script daily at 12 AM
RUN echo "0 0 * * * /usr/local/bin/python /app/data/data/run_data.py >> /app/cron.log 2>&1" > /etc/cron.d/daily-job && \
    echo "" >> /etc/cron.d/daily-job && \
    chmod 0644 /etc/cron.d/daily-job && \
    crontab /etc/cron.d/daily-job

CMD ["cron", "-f"]
