package com.openclassrooms.mddapi.payloads.responses;

import lombok.Data;

/**
 * Classe représentant une réponse simple avec un message.
 * Cette classe est utilisée pour formater les réponses de l'API
 * qui ne nécessitent qu'un message de confirmation ou d'information.
 */
@Data
public class SimpleOutputMessageResponse {

    /**
     * Message de la réponse.
     * Peut contenir des informations de succès, d'erreur ou de notification.
     */
    private String message;

    /**
     * Construit une nouvelle réponse avec un message.
     *
     * @param message Le message à inclure dans la réponse
     */
    public SimpleOutputMessageResponse(String message) {
        this.message = message;
    }
}
