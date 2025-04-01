package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Interface de repository pour la gestion des utilisateurs.
 * Fournit les méthodes d'accès aux données pour l'entité User,
 * incluant des méthodes personnalisées pour la recherche par email.
 * 
 * Cette interface permet de gérer les utilisateurs de l'application,
 * incluant leur authentification et la gestion de leurs profils.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Recherche un utilisateur par son adresse email.
     *
     * @param email L'adresse email de l'utilisateur à rechercher
     * @return Un Optional contenant l'utilisateur s'il existe, vide sinon
     */
    Optional<User> findByEmail(String email);
}
