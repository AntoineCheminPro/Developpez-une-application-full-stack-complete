package com.openclassrooms.mddapi.payloads.responses;

import lombok.Builder;
import lombok.Data;

/**
 * Classe représentant la réponse d'authentification de l'API.
 * Cette classe est utilisée pour encapsuler le token JWT généré lors de
 * l'authentification réussie d'un utilisateur.
 */
@Builder
@Data
public class AuthenticationResponse {

    /**
     * Token JWT (JSON Web Token) généré pour l'authentification.
     * Ce token contient les informations de l'utilisateur et ses autorisations.
     * Il doit être inclus dans l'en-tête Authorization des requêtes suivantes
     * sous la forme : "Bearer {token}"
     */
    private String token;
}