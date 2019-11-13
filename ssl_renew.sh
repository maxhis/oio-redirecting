#!/bin/bash

/usr/local/bin/docker-compose -f /home/ubuntu/oio-redirecting/docker-compose.yml run certbot renew \
&& /usr/local/bin/docker-compose -f /home/ubuntu/oio-redirecting/docker-compose.yml kill -s SIGHUP webserver