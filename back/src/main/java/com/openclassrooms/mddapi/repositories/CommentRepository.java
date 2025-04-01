package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interface de repository pour la gestion des commentaires.
 * Fournit les méthodes d'accès aux données pour l'entité Comment,
 * incluant des méthodes personnalisées pour la recherche par post.
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {

    /**
     * Récupère tous les commentaires associés à un post spécifique.
     *
     * @param postId L'identifiant du post
     * @return La liste des commentaires du post, triés par ordre chronologique
     */
    List<Comment> findByPostId(Integer postId);
}
