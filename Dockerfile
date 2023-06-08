FROM node:16 as builder
WORKDIR /app
COPY /dist/foosball-frontend /app/dist/foosball-frontend

FROM nginx:latest
COPY --from=builder /app/dist/foosball-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
