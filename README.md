
## Setup:
npm init -v
npm i express mysql dotenv hbs
npm i --save nodemon
npm install -g nodemon
npm i bcryptjs
npm i cookie-parser jsonwebtoken


## Open terminal and Run docker containers with docker compose:
    docker-compose up -d

## phpMyAdmin: 
### PHPADMIN:
### http://localhost:8183/sql.php?db=nodejs-login&table=users&pos=0

    http://localhost:8183/
    Server: mysql
    Username: root
    Password: root

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

Where root as your user localhost as your URL and password as your password

Then run this query to refresh privileges:
flush privileges;

If that doesn't work, try it without @'localhost' part.
ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'

## create database:
nodejs-login

## create tables:
name: users number of columns: 4 
CREATE TABLE `nodejs-login`. ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(100) NOT NULL , `email` VARCHAR(100) NOT NULL , `password` VARCHAR(100) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;


## Access mysql on terminal:
    docker exec -it mysql_container_name mysql -u root -p
    docker exec -it dev_mysql  mysql -u root -p 

## Create a file ".env" in the root folder
DATABASE = nodejs-login
DATABASE_HOST = localhost
DATABASE_USER = root
DATABASE_PASSWORD = password
JWT_SECRET = yoursupersecretpassword
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES = 90

Docker phpmyadmin ENV:
PMA_ARBITRARY	when set to 1 connection to the arbitrary server will be allowed
PPMA_HOST	define address/host name of the MySQL server
PMA_PORT	define port of the MySQL server