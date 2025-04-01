package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.payloads.requests.UpdateUserDetailsRequest;
import com.openclassrooms.mddapi.payloads.responses.SimpleOutputMessageResponse;
import com.openclassrooms.mddapi.payloads.responses.UserResponse;
import com.openclassrooms.mddapi.security.services.JwtService;
import com.openclassrooms.mddapi.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur gérant les opérations liées aux utilisateurs.
 * Expose les endpoints pour la gestion des profils utilisateurs.
 */
@RestController
@RequestMapping("user")
public class UserController {

    private static final String BEARER_TOKEN_STRING = "Bearer ";
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    /**
     * Récupère les détails d'un utilisateur.
     *
     * @param authorizationHeader Le token d'authentification
     * @return Les détails de l'utilisateur
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<UserResponse> getUserDetails(
            @RequestHeader("Authorization") String authorizationHeader) {
        
        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);
        var user = userService.getByEmail(userFromToken);

        var userResponse = UserResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .build();
                
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }

    /**
     * Met à jour les détails du profil utilisateur.
     *
     * @param userDetailsRequest Les nouvelles informations de l'utilisateur
     * @param authorizationHeader Le token d'authentification
     * @return Un message de confirmation
     */
    @PutMapping("")
    public ResponseEntity<SimpleOutputMessageResponse> updateDetails(
            @Valid @RequestBody UpdateUserDetailsRequest userDetailsRequest,
            @RequestHeader("Authorization") String authorizationHeader) {
        
        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);
        var user = userService.getByEmail(userFromToken);

        userService.updateFromRequest(
            user, 
            !user.getEmail().equals(userDetailsRequest.getEmail()), 
            userDetailsRequest
        );

        return new ResponseEntity<>(
            new SimpleOutputMessageResponse("Les informations du profil ont été mises à jour avec succès."), 
            HttpStatus.OK
        );
    }
}
