# Blabla-network [backend]

## Build react application
````
dotnet restore
dotnet run
````

````
docker build -t blabla-network-backend .
````

## Run it!
````
docker run --name blabla-network-backend -p 9000:80 -d -t blabla-network-backend
````