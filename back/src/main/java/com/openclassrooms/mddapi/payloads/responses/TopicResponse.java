package com.openclassrooms.mddapi.payloads.responses;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Classe représentant la réponse d'un topic dans l'API.
 * Cette classe est utilisée pour formater les données d'un topic
 * lors de son envoi au client, incluant ses informations de base
 * et sa description.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TopicResponse {

    /**
     * Identifiant unique du topic.
     */
    private Integer id;

    /**
     * Titre du topic.
     * Représente le nom principal du topic qui sera affiché dans l'interface.
     */
    private String title;

    /**
     * Description détaillée du topic.
     * Fournit des informations supplémentaires sur le sujet du topic.
     */
    private String description;
}
