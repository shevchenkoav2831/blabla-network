FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

COPY *.sln .
COPY *.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish -c release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:6.0
EXPOSE 80

WORKDIR /app
COPY --from=build /app ./
ENTRYPOINT ["dotnet", "BlablaNetwork.dll"]