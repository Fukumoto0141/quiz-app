FROM node:18-bullseye-slim

WORKDIR /projects

RUN npm install -g @angular/cli@15
