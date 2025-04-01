package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.Subscription;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository pour la gestion des abonnements aux topics.
 * Étend JpaRepository pour hériter des opérations CRUD de base.
 */
@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Integer> {

    /**
     * Récupère les identifiants de tous les topics auxquels un utilisateur est abonné.
     *
     * @param userId L'identifiant de l'utilisateur
     * @return Une liste optionnelle des identifiants des topics
     */
    @Query("SELECT s.Topic.id FROM Subscription s " +
           "WHERE s.user.id = :userId")
    Optional<List<Integer>> findAllThemeIdsSubscribedByUser(Integer userId);

    /**
     * Recherche l'abonnement spécifique d'un utilisateur pour un topic donné.
     *
     * @param topicId L'identifiant du topic
     * @param userId L'identifiant de l'utilisateur
     * @return L'abonnement trouvé, encapsulé dans un Optional
     */
    @Query("SELECT s FROM Subscription s " +
           "WHERE s.Topic.id = :topicId " +
           "AND s.user.id = :userId")
    Optional<Subscription> findUniqueSubscriptionForThemeByUser(Integer topicId, Integer userId);

    /**
     * Supprime l'abonnement d'un utilisateur pour un topic spécifique.
     * 
     * @param topicId L'identifiant du topic
     * @param userId L'identifiant de l'utilisateur
     */
    @Transactional
    @Modifying
    @Query("DELETE FROM Subscription s " +
           "WHERE s.Topic.id = :topicId " +
           "AND s.user.id = :userId")
    void deleteByThemeIdAndUserId(Integer topicId, Integer userId);
}

