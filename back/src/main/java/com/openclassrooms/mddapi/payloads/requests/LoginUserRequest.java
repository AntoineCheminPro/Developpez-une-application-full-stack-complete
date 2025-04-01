package com.openclassrooms.mddapi.payloads.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * Classe représentant la requête de connexion d'un utilisateur.
 * Cette classe est utilisée pour valider les données entrantes lors de
 * l'authentification d'un utilisateur dans l'application.
 */
@Data
public class LoginUserRequest {

    /**
     * Adresse email de l'utilisateur.
     * Doit être une adresse email valide et ne peut pas être vide.
     * Le format attendu est : utilisateur@domaine.extension
     */
    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)
    @NotBlank(message = "L'adresse email est requise")
    private String email;

    /**
     * Mot de passe de l'utilisateur.
     * Ne peut pas être vide ou constitué uniquement d'espaces.
     */
    @NotBlank(message = "Le mot de passe est requis")
    private String password;
}
