package com.openclassrooms.mddapi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Configuration pour activer l'auditing JPA.
 * Permet le suivi automatique des dates de création et de modification des entités.
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfiguration {
}
