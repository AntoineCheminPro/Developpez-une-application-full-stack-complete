package com.openclassrooms.mddapi.utils;

import java.time.format.DateTimeFormatter;

/**
 * Utilitaire pour le formatage des dates dans l'application.
 * 
 * Cette classe fournit un formateur de date standardisé utilisé
 * pour l'affichage des dates dans les réponses de l'API.
 */
public class DateFormatter {
    
    /**
     * Format de date standard utilisé dans l'application.
     * Format : "yyyy/MM/dd HH:mm:ss"
     */
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

    /**
     * Récupère le formateur de date standard.
     *
     * @return Le formateur de date configuré
     */
    public static DateTimeFormatter getFormatter() {
        return FORMATTER;
    }
}

