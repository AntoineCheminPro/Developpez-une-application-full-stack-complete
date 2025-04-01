package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interface de repository pour la gestion des topics.
 * Fournit les méthodes d'accès aux données pour l'entité Topic,
 * héritant des opérations CRUD de base de JpaRepository.
 * 
 * Cette interface permet de gérer les topics (sujets) de discussion
 * dans l'application, incluant leur création, modification,
 * suppression et recherche.
 */
@Repository
public interface TopicRepository extends JpaRepository<Topic, Integer> {
}
