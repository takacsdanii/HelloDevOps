FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

ENV HTTP_PROXY=http://TAK9BP:DAdolino2002@rb-proxy-de.bosch.com:8080
ENV HTTPS_PROXY=http://TAK9BP:DAdolino2002@rb-proxy-de.bosch.com:8080

COPY HelloBackend/HelloBackend.csproj HelloBackend/

RUN dotnet restore HelloBackend/HelloBackend.csproj

COPY . . 

RUN dotnet build HelloBackend/HelloBackend.csproj -c Release -o /app/build 


FROM build AS publish
RUN dotnet publish HelloBackend/HelloBackend.csproj -c Release -o /app/publish /p:UseAppHost=false


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

ENV ASPNETCORE_URLS=http://+:8080 

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "HelloBackend.dll"]