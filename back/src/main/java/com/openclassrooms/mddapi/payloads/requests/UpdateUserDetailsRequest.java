package com.openclassrooms.mddapi.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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

    /**
     * Nouveau mot de passe de l'utilisateur.
     * Optionnel. Si fourni, doit respecter les critères de sécurité.
     */
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$", 
            message = "Le mot de passe doit contenir au moins 8 caractères, un chiffre, une minuscule, une majuscule et un caractère spécial")
    private String password;
}
