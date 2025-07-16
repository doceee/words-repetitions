FROM nginx:alpine

ARG NGINX_HOSTNAME=localhost
ARG API_PORT=3000
ARG LANDING_PORT=3001

RUN apk add --no-cache openssl
RUN mkdir -p /etc/nginx/ssl

COPY cert-renew.sh /cert-renew.sh
RUN chmod +x /cert-renew.sh

RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/selfsigned.key \
  -out /etc/nginx/ssl/selfsigned.crt \
  -subj "/CN=${NGINX_HOSTNAME}"

COPY default.conf /etc/nginx/conf.d/default.conf

RUN sed -i "s/NGINX_HOSTNAME/${NGINX_HOSTNAME}/g" /etc/nginx/conf.d/default.conf
RUN sed -i "s/API_PORT/${API_PORT}/g" /etc/nginx/conf.d/default.conf
RUN sed -i "s/LANDING_PORT/${LANDING_PORT}/g" /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 443

CMD ["/bin/sh", "-c", "/cert-renew.sh \"$NGINX_HOSTNAME\" & nginx -g 'daemon off;'"]
