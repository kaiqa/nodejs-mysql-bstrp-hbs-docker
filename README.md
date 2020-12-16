

## Setup node:
```
brew update --verbose
brew install node
npm -v
node -v

npm init -v
npm i express mysql dotenv hbs
npm i --save nodemon
npm install -g nodemon
npm i bcryptjs
npm i cookie-parser jsonwebtoken
```

## Start mysql database with docker compose:
    cd /docker
    docker-compose up -d


## PHPMYADMIN:
##### _Where root as your user localhost as your URL and PASSWORD as your password_

1. Navigate to: <http://localhost:8183/sql.php?db=nodejs-login&table=users&pos=0>
2. Fill in credentials:
`
        Server: mysql
        Username: root
        Password: root
`
3. Select the database mysql
4. Click on tab: **SQL**
#### Change user security and set new password:
5. Fill in: 
`
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password'
`
6. Click on button: **Go**
7. Fill in: `flush privileges;`
8. Click on button: **Go**

## Create database:
1. Click on: **new**
2. Fill in: **nodejs-login**
3. Click on button: **Create**

## Import database dump
1. Click on tab: **import**
2. Click on button: **Choose file**
3. Select: **/dumbs/nodejs-login.sql**
4. Click on button: **Go**

## Create tables by hand:
```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `user-type` varchar(100) NOT NULL DEFAULT 'registered',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

Alter table users ADD(user_type Varchar(10) Default 'registered');
```

## Access mysql on terminal:
    docker exec -it mysql_container_name mysql -u root -p
    docker exec -it dev_mysql  mysql -u root -p 

## Create a file ".env" in the root folder
```
DATABASE = nodejs-login
DATABASE_HOST = localhost
DATABASE_USER = root
DATABASE_PASSWORD = password
JWT_SECRET = yoursupersecretpassword
JWT_EXPIRES_IN = 90d
JWT_COOKIE_EXPIRES = 90

```
### Docker phpmyadmin ENV:
PMA_ARBITRARY	when set to 1 connection to the arbitrary server will be allowed
PPMA_HOST	define address/host name of the MySQL server
PMA_PORT	define port of the MySQL server

## Docker tricks:
One liner to stop / remove all of Docker containers:
```
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker-compose up -d
```
## Create a certificate for https with letsencrypt
https://certbot.eff.org/lets-encrypt/osx-other

```
brew install certbot
sudo certbot certonly --standalone

```
Copy the certs to the root of the project folder "/cert".

Example: 
```
sudo cp /etc/letsencrypt/live/kaiqa.duckdns.org/cert.pem ~/Development/kaiqa-github/nodejs-mysql-bstrp-hbs-docker/cert

``` 
cert = /etc/letsencrypt/live/kaiqa.duckdns.org/cert.pem
privkey = /etc/letsencrypt/live/kaiqa.duckdns.org/privkey.pem
chain = /etc/letsencrypt/live/kaiqa.duckdns.org/chain.pem
fullchain = /etc/letsencrypt/live/kaiqa.duckdns.org/fullchain.pem

# npm2
## install with npm
    npm i -g pm2
##  run with pm2
    pm2 start app.js --name homepage
### usefull commands
      pm2 monit
      pm2 stop all
      pm2 delete all