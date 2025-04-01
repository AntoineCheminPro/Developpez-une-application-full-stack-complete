package com.openclassrooms.mddapi.payloads.responses;

import lombok.Builder;
import lombok.Data;

/**
 * Classe représentant la réponse d'un commentaire dans l'API.
 * Cette classe est utilisée pour formater les données d'un commentaire
 * lors de son envoi au client, incluant les informations de l'auteur
 * et le contenu du commentaire.
 */
@Builder
@Data
public class CommentResponse {

    /**
     * Identifiant unique du commentaire.
     */
    private Integer id;

    /**
     * Nom d'utilisateur de l'auteur du commentaire.
     * Permet d'identifier facilement qui a écrit le commentaire.
     */
    private String username;

    /**
     * Contenu textuel du commentaire.
     * Représente le message écrit par l'utilisateur.
     */
    private String text;

    /**
     * Date et heure de création du commentaire.
     * Format : "yyyy-MM-dd HH:mm:ss"
     */
    private String createdAt;
}
