FROM mongo:6
COPY backup.sh /backup.sh
RUN chmod +x /backup.sh
CMD ["sh", "-c", "crontab -l | { cat; echo '0 2 * * * /backup.sh'; } | crontab - && cron -f"]
