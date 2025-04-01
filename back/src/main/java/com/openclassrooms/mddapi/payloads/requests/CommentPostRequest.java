package com.openclassrooms.mddapi.payloads.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Classe représentant la requête de création d'un commentaire.
 * Cette classe est utilisée pour valider les données entrantes lors de la création
 * ou la modification d'un commentaire.
 */
@Data
public class CommentPostRequest {

    /**
     * Contenu du commentaire.
     * Ne peut pas être vide ou constitué uniquement d'espaces.
     */
    @NotBlank(message = "Le commentaire ne peut pas être vide")
    private String comment;
}

