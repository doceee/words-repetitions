#!/bin/sh

HOSTNAME=${1:-localhost}

while :; do
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt \
    -subj "/CN=${HOSTNAME}"
  sleep 2592000 # 30 days
done
