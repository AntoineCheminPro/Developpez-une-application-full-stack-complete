package com.openclassrooms.mddapi.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Classe représentant la requête de création d'un post avec son topic associé.
 * Cette classe est utilisée pour valider les données entrantes lors de
 * la création ou la modification d'un post dans un topic spécifique.
 */
@Data
public class PostWithTopicRequest {

    /**
     * Titre du post.
     * Ne peut pas être vide ou constitué uniquement d'espaces.
     * Sera affiché comme en-tête du post dans l'interface utilisateur.
     */
    @NotBlank(message = "Le titre est requis")
    private String title;

    /**
     * Description détaillée du post.
     * Ne peut pas être vide ou constitué uniquement d'espaces.
     * Contient le contenu principal du post.
     */
    @NotBlank(message = "La description est requise")
    private String description;
}
