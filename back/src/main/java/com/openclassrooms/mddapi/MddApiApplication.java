package com.openclassrooms.mddapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import com.openclassrooms.mddapi.configuration.CorsConfiguration;

/**
 * Point d'entrée principal de l'application MDD API.
 * 
 * Cette classe initialise l'application Spring Boot et configure
 * l'environnement d'exécution. Elle active la configuration automatique
 * et le scan des composants Spring.
 */
@SpringBootApplication
@EnableConfigurationProperties
public class MddApiApplication {

	/**
	 * Méthode principale qui démarre l'application Spring Boot.
	 *
	 * @param args Les arguments de ligne de commande
	 */
	public static void main(String[] args) {
		SpringApplication.run(MddApiApplication.class, args);
	}

}
