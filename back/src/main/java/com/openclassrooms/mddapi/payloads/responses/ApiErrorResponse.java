package com.openclassrooms.mddapi.payloads.responses;

import com.openclassrooms.mddapi.utils.DateFormatter;
import lombok.Data;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Classe représentant la réponse d'erreur standardisée de l'API.
 * Cette classe est utilisée pour formater toutes les erreurs de manière cohérente
 * à travers l'application, incluant le code d'erreur, le message, la trace et l'horodatage.
 */
@Data
public class ApiErrorResponse {

    /**
     * Code d'erreur HTTP associé à la réponse.
     * Exemple : 400 pour une erreur de validation, 404 pour une ressource non trouvée.
     */
    private Integer errorCode;

    /**
     * Message d'erreur descriptif expliquant la cause de l'erreur.
     * Peut contenir un message unique ou une liste de messages séparés par des virgules.
     */
    private String errorMessage;

    /**
     * Trace de la pile d'exécution (stack trace) de l'erreur.
     * Utile pour le débogage en environnement de développement.
     */
    private String stackTrace;

    /**
     * Horodatage de l'erreur au format ISO 8601.
     * Format : "yyyy-MM-dd HH:mm:ss"
     */
    private String timestamp;

    /**
     * Construit une réponse d'erreur avec un ensemble de messages.
     *
     * @param errorCode Le code d'erreur HTTP
     * @param errorMessages L'ensemble des messages d'erreur à joindre
     * @param timestamp L'horodatage de l'erreur
     */
    public ApiErrorResponse(Integer errorCode, Set<String> errorMessages, LocalDateTime timestamp) {
        this.errorCode = errorCode;
        this.errorMessage = StringUtils.join(errorMessages, ",");
        this.timestamp = formatDate(timestamp);
    }

    /**
     * Construit une réponse d'erreur avec un message unique.
     *
     * @param errorCode Le code d'erreur HTTP
     * @param errorMessage Le message d'erreur unique
     * @param timestamp L'horodatage de l'erreur
     */
    public ApiErrorResponse(Integer errorCode, String errorMessage, LocalDateTime timestamp) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
        this.timestamp = formatDate(timestamp);
    }

    /**
     * Formate une date en chaîne de caractères selon le format standard de l'application.
     *
     * @param date La date à formater
     * @return La date formatée en chaîne de caractères
     */
    private String formatDate(LocalDateTime date) {
        return date.format(DateFormatter.getFormatter());
    }
}
