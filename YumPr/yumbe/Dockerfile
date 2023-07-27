FROM openjdk:17
ENV SPRING_PROFILES_ACTIVE=docker
ARG JAR_FILE=./build/libs/yumbe-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]