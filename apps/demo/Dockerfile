FROM nginx:1.24-alpine

EXPOSE 8080

RUN rm -rf /usr/share/nginx/html/* && \
  rm -rf /etc/nginx/conf.d/default.conf && \
  mkdir /usr/share/nginx/html/.well-known && \
  touch /usr/share/nginx/html/.well-known/live

COPY ./default.nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/ /usr/share/nginx/html/
COPY ./.env.example /usr/share/nginx/html/.env.example

# Setting the right permissions for the non-root user to access the needed files
RUN chown -R 1001 /usr/share/nginx/html && \
  chown -R 1001 /var/cache/nginx && \
  chown -R 1001 /var/log/nginx && \
  chown -R 1001 /etc/nginx/conf.d && \
  touch /var/run/nginx.pid && \
  chown -R 1001 /var/run/nginx.pid

# Ensure that binary for dynamic env variables is executable
RUN chmod +x /usr/share/nginx/html/import-meta-env-alpine

# UID 1001 is the non-privileged user used by ODJ
USER 1001

# Will substitute the env variables with the runtime values
ENTRYPOINT [ "/bin/sh", "-c", "/usr/share/nginx/html/import-meta-env-alpine -x /usr/share/nginx/html/.env.example -p /usr/share/nginx/html/index.html && /docker-entrypoint.sh nginx -g \"daemon off;\"" ]