# Remote vMix Control Solution

## Objective

Take full control of the vMix software remotely without the need to open ports on your network using our web application. Our solution is built on a dedicated Docker server, for which a Docker image is available.

## Key Features

1. **Remote control of vMix software**

2. **No port opening required** 

3. **Utilizes a Docker server for efficient management and easy scalability** 

4. **Log de l'Activité:**

## System Requirements:

- Docker Server 
- Modern web browser (chromium (chrome,edge...) or firefox)
- Docker Compose (if used without Docker Hub)
Make sure to install Docker and Docker Compose on your server to leverage all the features of the application. If you're using a configuration without Docker Hub, ensure you have Docker Compose installed locally on your system.

## How to Use Docker Image with Docker Compose (recommandé, [DockerHub](https://hub.docker.com/r/vincentberry/vmix-remote))

````Dockercompose.yml
version: '3'
services:
  vmix-remote:
    image: vincentberry/vmix-remote
    ports:
      - "8080:80"
    restart: unless-stopped
````
The logs are stored within the Docker container `/var/log/apache2`

## How to Use Docker Image with Docker Compose (without Docker Hub)

1. Download the GitHub repository.
2. Docker compose up.

````Dockercompose.yml
version: '3'

services:
  vmix-remote:
    image: php:8.0-apache
    container_name: vmix-remote
    volumes:
        - ./app/:/var/www/html/
        - ./config/prod/apache2/conf-available/swag.conf:/etc/apache2/conf-available/swag.conf
        - ./config/prod/apache2/sites-enabled:/etc/apache2/sites-enabled/
        - ./log:/var/log/apache2
    restart: unless-stopped
    hostname: vmix-remote
     # command: a2enmod rewrite  && a2enmod remoteip && a2enconf swag && docker-php-ext-install pdo pdo_mysql && /etc/init.d/apache2 restart 
    networks: 
      - remotevmix

networks:
  remotevmix_apache:
    name: remotevmix
````

### Enhance your vMix experience with our hassle-free remote control solution!

This README was created with the support of artificial intelligence to provide clear and helpful information.