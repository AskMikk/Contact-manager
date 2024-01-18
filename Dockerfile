
FROM maven:3.8.4-openjdk-17 as builder

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src src

RUN mvn package -DskipTests

FROM openjdk:17-jdk

WORKDIR /app

COPY --from=builder /app/target/contactmanager-0.0.1-SNAPSHOT.jar .

CMD ["java", "-jar", "contactmanager-0.0.1-SNAPSHOT.jar"]