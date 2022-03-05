FROM node:17

COPY package*.json ./
COPY entrypoint.sh /entrypoint/

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

ENTRYPOINT ["/entrypoint/entrypoint.sh"]