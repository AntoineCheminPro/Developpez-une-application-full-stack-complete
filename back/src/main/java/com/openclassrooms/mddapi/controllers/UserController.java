package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.payloads.requests.UpdateUserDetailsRequest;
import com.openclassrooms.mddapi.payloads.responses.UserResponse;
import com.openclassrooms.mddapi.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Contrôleur gérant les opérations liées aux utilisateurs.
 * Expose les endpoints pour la gestion du profil utilisateur.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Récupère les informations du profil de l'utilisateur connecté.
     *
     * @param authentication L'authentification de l'utilisateur connecté
     * @return Les informations du profil utilisateur
     */
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUserProfile(Authentication authentication) {
        return ResponseEntity.ok(userService.getCurrentUserProfile(authentication));
    }

    /**
     * Met à jour les informations du profil de l'utilisateur connecté.
     *
     * @param updateUserDetailsRequest Les nouvelles informations du profil
     * @param authentication L'authentification de l'utilisateur connecté
     * @return Les informations mises à jour du profil utilisateur
     */
    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateUserProfile(
            @Valid @RequestBody UpdateUserDetailsRequest updateUserDetailsRequest,
            Authentication authentication) {
        return ResponseEntity.ok(userService.updateUserProfile(updateUserDetailsRequest, authentication));
    }
} 