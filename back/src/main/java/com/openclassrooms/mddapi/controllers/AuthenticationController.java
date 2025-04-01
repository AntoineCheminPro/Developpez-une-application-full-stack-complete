package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.payloads.requests.LoginUserRequest;
import com.openclassrooms.mddapi.payloads.requests.RegisterUserRequest;
import com.openclassrooms.mddapi.payloads.responses.AuthenticationResponse;
import com.openclassrooms.mddapi.payloads.responses.SimpleOutputMessageResponse;
import com.openclassrooms.mddapi.services.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur gérant l'authentification des utilisateurs.
 * Expose les endpoints pour l'inscription et la connexion.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    /**
     * Inscription d'un nouvel utilisateur.
     *
     * @param registerUserRequest Les informations d'inscription de l'utilisateur
     * @return Message de confirmation de l'inscription
     */
    @PostMapping("/register")
    public ResponseEntity<SimpleOutputMessageResponse> registerUser(
            @Valid @RequestBody RegisterUserRequest registerUserRequest) {
        authenticationService.registerUser(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SimpleOutputMessageResponse("L'utilisateur a été inscrit avec succès"));
    }

    /**
     * Connexion d'un utilisateur existant.
     *
     * @param loginUserRequest Les informations de connexion de l'utilisateur
     * @return Les informations d'authentification (token JWT, etc.)
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> loginUser(
            @Valid @RequestBody LoginUserRequest loginUserRequest) {
        AuthenticationResponse authenticationResponse = authenticationService.loginUser(loginUserRequest);
        return ResponseEntity.ok(authenticationResponse);
    }
}
