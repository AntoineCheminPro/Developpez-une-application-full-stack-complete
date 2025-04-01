package com.openclassrooms.mddapi.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

/**
 * Classe représentant la requête de mise à jour des informations d'un utilisateur.
 * Cette classe est utilisée pour valider les données entrantes lors de
 * la modification du profil d'un utilisateur existant.
 */
@Builder
@Data
public class UpdateUserDetailsRequest {

    /**
     * Nouveau nom de l'utilisateur.
     * Ne peut pas être vide ou constitué uniquement d'espaces.
     * Sera utilisé comme nom d'affichage dans l'application.
     */
    @NotBlank(message = "Le nom est requis")
    private String name;

    /**
     * Nouvelle adresse email de l'utilisateur.
     * Ne peut pas être vide ou constitué uniquement d'espaces.
     * Sera utilisée comme identifiant de connexion.
     */
    @NotBlank(message = "L'adresse email est requise")
    private String email;
}
