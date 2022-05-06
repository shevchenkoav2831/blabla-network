# Blabla-Network [frontend]

## Build react application
````
npm install
npm run build
````

## Build docker image
````
docker build -t blabla-network-front .
````

## Run it!
````
docker run --name blabla-network-front -p 80:80 -d -t blabla-network-front
````