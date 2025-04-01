package com.openclassrooms.mddapi.exceptions;

/**
 * Exception levée lors d'une erreur liée à l'abonnement à un thème.
 * Cette exception est utilisée pour gérer les cas d'erreur spécifiques aux abonnements,
 * comme une tentative de double abonnement ou de désabonnement d'un thème non suivi.
 */
public class ThemeSubscriptionException extends RuntimeException {

    /**
     * Construit une nouvelle instance de ThemeSubscriptionException.
     *
     * @param message Le message détaillant la raison de l'exception
     */
    public ThemeSubscriptionException(String message) {
        super(message);
    }
}
