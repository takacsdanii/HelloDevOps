FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["HelloBackend/HelloBackend.csproj", "HelloBackend/"] 
RUN dotnet restore "HelloBackend/HelloBackend.csproj"

COPY . .

WORKDIR /src/HelloBackend
RUN dotnet publish -c Release -o /app/publish --no-restore


FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "HelloBackend.dll"]