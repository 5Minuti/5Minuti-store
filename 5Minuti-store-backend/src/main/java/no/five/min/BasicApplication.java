package no.five.min;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BasicApplication {

    public static void main(String[] args) {
        SpringApplication.run(BasicApplication.class, args);
    }

// COMMENT: Annotations should be indented in accordance to the methods they represent
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        // COMMENT: is this code really correct? Do you know what is going on there, what is the /greeting-javaconfig? And why :8383?
        // Is this method used at all? You do almost the same again in WebSecurityConfig::configure().
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
            }
        };
    }

}
