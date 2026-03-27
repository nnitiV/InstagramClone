# 1. Build Stage - Using .NET 10 SDK
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /source

# Copy all .csproj files first for efficient caching
COPY ["API/API.csproj", "API/"]
COPY ["Infrastructure/Infrastructure.csproj", "Infrastructure/"]
COPY ["Application/Application.csproj", "Application/"]
COPY ["Domain/Domain.csproj", "Domain/"] 

RUN dotnet restore "API/API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/source/API"
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# 2. Runtime Stage - Using .NET 10 Runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Note: Since your project is API.csproj, the output is likely API.dll
ENTRYPOINT ["dotnet", "API.dll"]