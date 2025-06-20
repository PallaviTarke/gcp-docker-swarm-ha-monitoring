#!/bin/bash
DATE=$(date +%F_%H-%M)
mongodump --out /backup/mongodump-$DATE
