package com.openclassrooms.mddapi.payloads.responses;

import lombok.*;

/**
 * Classe représentant la réponse d'un post dans l'API.
 * Cette classe est utilisée pour formater les données d'un post
 * lors de son envoi au client, incluant les informations du topic associé,
 * le contenu du post et les informations de l'auteur.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PostResponse {

    /**
     * Identifiant unique du post.
     */
    private Integer id;

    /**
     * Identifiant du topic auquel le post appartient.
     */
    private Integer topicId;

    /**
     * Nom du topic associé au post.
     * Permet d'afficher le contexte du post sans avoir à faire une requête supplémentaire.
     */
    private String topicName;

    /**
     * Titre du post.
     * Représente l'en-tête principal du post.
     */
    private String title;

    /**
     * Description détaillée du post.
     * Contient le contenu principal du post.
     */
    private String description;

    /**
     * Date et heure de création du post.
     * Format : "yyyy-MM-dd HH:mm:ss"
     */
    private String createdAt;

    /**
     * Nom d'utilisateur de l'auteur du post.
     * Permet d'identifier qui a créé le post.
     */
    private String author;
}
