FROM node:14 AS build
ARG NODE_ENV
WORKDIR /build

COPY ./ /build

RUN npm install
RUN npm install typescript


RUN npm run build-${NODE_ENV}

FROM php:apache

ARG NODE_ENV
ENV COMPOSER_ALLOW_SUPERUSER=1

EXPOSE 80
WORKDIR /var/www/html/

RUN apt-get update -qq && \
    apt-get install -qy \
    git \
    gnupg \
    unzip \
    zip && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# PHP Extensions
RUN docker-php-ext-install -j$(nproc) opcache pdo_mysql

# Apache
COPY config/${NODE_ENV}/apache2/conf-available/swag.conf /etc/apache2/conf-available/swag.conf
COPY /config/${NODE_ENV}/apache2/sites-enabled /etc/apache2/sites-enabled/
COPY --from=build /build/app/ /var/www/html/
COPY app/src/inc/${NODE_ENV}/ /var/www/html/inc/

RUN rm -rf /var/www/html/src

RUN mkdir -p /var/www/html/file/
RUN mkdir -p /var/www/html/db/
RUN chmod -R 777 /var/www/html/db/
RUN chmod -R 777 /var/www/html/file/
RUN a2enmod rewrite
RUN a2enmod remoteip && \
    a2enconf swag && \
    /etc/init.d/apache2 restart