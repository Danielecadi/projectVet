# Usa l'immagine ufficiale di PHP con estensioni utili per Laravel
FROM php:8.3-apache

# Installa estensioni necessarie
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql zip

# Copia i file del progetto
COPY . /var/www/html

# Imposta la directory di lavoro
WORKDIR /var/www/html

# Installa Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
RUN composer install --no-dev --optimize-autoloader

# Imposta permessi corretti
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Esponi la porta
EXPOSE 8000

# Comando di avvio
CMD php artisan serve --host=0.0.0.0 --port=8000
