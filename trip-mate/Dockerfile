# Multi-stage build
FROM maven:3.9.9-amazoncorretto-17 AS build

WORKDIR /app
COPY pom.xml ./
COPY src ./src

RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy JAR file từ build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port
EXPOSE 8080

# Lệnh chạy app khi container start
ENTRYPOINT ["java", "-jar", "/app/app.jar"]