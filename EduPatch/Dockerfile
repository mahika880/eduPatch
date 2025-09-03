# Use OpenJDK 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY EduPatch/mvnw EduPatch/mvnw.cmd EduPatch/pom.xml ./
COPY EduPatch/.mvn ./.mvn

# Copy source code
COPY EduPatch/src ./src

# Make mvnw executable
RUN chmod +x ./mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose port
EXPOSE $PORT

# Run the application
CMD java -Dserver.port=$PORT -jar target/*.jar