package com.openclassrooms.mddapi.exceptions;

/**
 * Exception levée lorsqu'une tentative de création d'utilisateur échoue car l'utilisateur existe déjà.
 * Cette exception est utilisée lors de l'inscription pour empêcher la création de doublons,
 * notamment lorsqu'une adresse email est déjà utilisée.
 */
public class UserAlreadyExistException extends RuntimeException {

    /**
     * Construit une nouvelle instance de UserAlreadyExistException.
     *
     * @param message Le message détaillant la raison de l'exception
     */
    public UserAlreadyExistException(String message) {
        super(message);
    }
}
