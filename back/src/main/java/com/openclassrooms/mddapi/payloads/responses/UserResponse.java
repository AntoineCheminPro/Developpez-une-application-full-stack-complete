package com.openclassrooms.mddapi.payloads.responses;

import lombok.Builder;
import lombok.Data;

/**
 * Classe représentant la réponse d'un utilisateur dans l'API.
 * Cette classe est utilisée pour formater les données d'un utilisateur
 * lors de son envoi au client, en ne transmettant que les informations
 * publiques et non sensibles.
 */
@Builder
@Data
public class UserResponse {

    /**
     * Nom d'affichage de l'utilisateur.
     * Représente le nom public qui sera affiché dans l'interface.
     */
    private String name;

    /**
     * Adresse email de l'utilisateur.
     * Sert d'identifiant unique et de moyen de contact.
     */
    private String email;
}
