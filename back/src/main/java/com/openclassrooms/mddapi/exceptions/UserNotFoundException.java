package com.openclassrooms.mddapi.exceptions;

/**
 * Exception levée lorsqu'un utilisateur n'est pas trouvé dans la base de données.
 * Cette exception est utilisée pour gérer les cas où un utilisateur est recherché
 * avec un identifiant ou une adresse email qui n'existe pas.
 */
public class UserNotFoundException extends RuntimeException {

    /**
     * Construit une nouvelle instance de UserNotFoundException.
     *
     * @param message Le message détaillant la raison de l'exception
     */
    public UserNotFoundException(String message) {
        super(message);
    }
}
