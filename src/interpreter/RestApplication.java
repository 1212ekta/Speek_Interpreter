package interpreter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main entry point for the Spring Boot REST Backend.
 * Hijacks System.out on startup to enable thread-safe console output capture.
 */
@SpringBootApplication
public class RestApplication {
    public static void main(String[] args) {
        // Globally redirect standard output to enable thread-safe capturing per request
        System.setOut(new ThreadLocalPrintStream(System.out));

        SpringApplication.run(RestApplication.class, args);
    }
}
