# Stage 2
FROM nginx:alpine
WORKDIR /app
COPY dist/ .
COPY /dist/slurm-mqtt-dashboard /usr/share/nginx/html