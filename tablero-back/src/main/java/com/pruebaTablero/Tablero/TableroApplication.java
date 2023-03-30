package com.pruebaTablero.Tablero;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import com.pruebaTablero.Tablero.config.JpaConfig;

@SpringBootApplication
@Import(JpaConfig.class)
public class TableroApplication {

    public static void main(String[] args) {
        SpringApplication.run(TableroApplication.class, args);
    }

}