FROM openjdk:17
#ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080
ARG JAR_FILE=./build/libs/backend-2.1.0.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]