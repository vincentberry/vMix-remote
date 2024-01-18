FROM php:apache

ENV COMPOSER_ALLOW_SUPERUSER=1

EXPOSE 80
WORKDIR /app

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
COPY config/prod/apache2/conf-available/swag.conf /etc/apache2/conf-available/swag.conf
COPY /config/prod/apache2/sites-enabled /etc/apache2/sites-enabled/
COPY app/ /var/www/html/

RUN mkdir -p /var/www/html/file/
RUN chmod -R 777 /var/www/html/file/
RUN a2enmod rewrite
RUN a2enmod remoteip && \
    a2enconf swag && \
    /etc/init.d/apache2 restart