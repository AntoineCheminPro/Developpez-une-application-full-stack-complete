package com.openclassrooms.mddapi.exceptions;

/**
 * Exception levée lorsqu'un post n'est pas trouvé dans la base de données.
 * Cette exception est utilisée pour gérer les cas où un post est recherché
 * avec un identifiant qui n'existe pas.
 */
public class PostNotFoundException extends RuntimeException {

    /**
     * Construit une nouvelle instance de PostNotFoundException.
     *
     * @param message Le message détaillant la raison de l'exception
     */
    public PostNotFoundException(String message) {
        super(message);
    }
}
