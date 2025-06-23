FROM mongo:6

# Install cron
RUN apt-get update && apt-get install -y cron

# Copy backup script
COPY backup.sh /backup.sh
RUN chmod +x /backup.sh

# Create the cron job file
RUN echo "0 2 * * * root /backup.sh >> /var/log/cron.log 2>&1" > /etc/cron.d/mongobackup

# Set permissions and register the cron job
RUN chmod 0644 /etc/cron.d/mongobackup && crontab /etc/cron.d/mongobackup

# Ensure cron log file exists
RUN touch /var/log/cron.log

# Run cron in foreg

