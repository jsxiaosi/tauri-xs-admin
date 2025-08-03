FROM nginx:latest

LABEL description="Nginx vue-xs-admin"

COPY dist  /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

CMD [ "nginx", "-g", "daemon off;" ]

