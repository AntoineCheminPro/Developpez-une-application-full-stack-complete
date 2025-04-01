package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository pour la gestion des posts.
 * Étend JpaRepository pour hériter des opérations CRUD de base.
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {

    /**
     * Récupère tous les posts des topics auxquels l'utilisateur est abonné.
     * 
     * Requête SQL équivalente :
     * SELECT posts.* FROM posts
     * INNER JOIN topics t ON t.id = posts.topic_id
     * INNER JOIN subscriptions s ON s.topic_id = t.id
     * WHERE s.user_id = :userId
     *
     * @param userId L'identifiant de l'utilisateur
     * @return La liste des posts des topics auxquels l'utilisateur est abonné
     */
    @Query("SELECT p FROM Post p " +
           "INNER JOIN p.topic t " +
           "INNER JOIN Subscription s ON s.Topic = t " +
           "WHERE s.user.id = :userId")
    List<Post> findPostsBySubscriptionUserId(@Param("userId") Integer userId);
}
