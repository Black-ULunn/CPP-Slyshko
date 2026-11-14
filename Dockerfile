FROM nginx:alpine
LABEL maintainer="Oksana Slyshko" version="1.0" description="RIP - static website(LAB1.2)"
COPY index.html style.css script.js /usr/share/nginx/html/
EXPOSE 80