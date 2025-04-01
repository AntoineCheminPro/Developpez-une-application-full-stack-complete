package com.openclassrooms.mddapi.exceptions;

/**
 * Exception levée lorsqu'un topic n'est pas trouvé dans la base de données.
 * Cette exception est utilisée pour gérer les cas où un topic est recherché
 * avec un identifiant qui n'existe pas ou a été supprimé.
 */
public class TopicNotFoundException extends RuntimeException {

    /**
     * Construit une nouvelle instance de TopicNotFoundException.
     *
     * @param message Le message détaillant la raison de l'exception
     */
    public TopicNotFoundException(String message) {
        super(message);
    }
}
