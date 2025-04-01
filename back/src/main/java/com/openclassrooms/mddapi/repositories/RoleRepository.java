package com.openclassrooms.mddapi.repositories;

import com.openclassrooms.mddapi.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Interface de repository pour la gestion des rôles.
 * Fournit les méthodes d'accès aux données pour l'entité Role,
 * incluant des méthodes personnalisées pour la recherche par nom.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

    /**
     * Recherche un rôle par son nom.
     *
     * @param name Le nom du rôle à rechercher
     * @return Un Optional contenant le rôle s'il existe, vide sinon
     */
    Optional<Role> findByName(String name);
}
