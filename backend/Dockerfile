FROM openjdk:17
#ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080
COPY app.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
