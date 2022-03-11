FROM node:17

COPY package*.json ./
COPY entrypoint.sh /entrypoint/

RUN ["npm", "i", "-g", "npm"]

RUN ["chmod", "+x", "entrypoint/entrypoint.sh"]

ENTRYPOINT ["/entrypoint/entrypoint.sh"]
