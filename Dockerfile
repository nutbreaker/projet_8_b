FROM node:24-alpine
WORKDIR /kasa

ENV BACKEND_PORT=8000 \
    FRONTEND_PORT=8082 \
    JWT_SECRET=replace-me-with-a-super-dupper-secret-phrase

COPY backend ./backend
COPY frontend ./frontend

WORKDIR /kasa/backend

RUN npm install

WORKDIR /kasa/frontend
RUN npm install
RUN npm run build
WORKDIR /kasa

CMD ["sh", "-c", "PORT=${BACKEND_PORT:-8000} npm --prefix /kasa/backend start & PORT=${FRONTEND_PORT:-8082} npm --prefix /kasa/frontend start & wait"]