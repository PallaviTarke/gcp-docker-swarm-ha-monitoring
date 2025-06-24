#!/bin/sh
# Wait until redis-master is reachable
for i in {1..30}; do
  if redis-cli -h redis-master -p 6379 ping | grep -q PONG; then
    echo "redis-master is ready!"
    break
  fi
  echo "Waiting for redis-master to be ready... (attempt $i/30)"
  sleep 2
done

# Check if redis-master is still not reachable
if ! redis-cli -h redis-master -p 6379 ping | grep -q PONG; then
  echo "Error: redis-master is not reachable after 30 attempts"
  exit 1
fi

# Ensure entrypoint script is executable
chmod +x /redis-sentinel-entrypoint.sh

# Start Redis Sentinel
exec redis-server /etc/redis/sentinel.conf --sentinel
