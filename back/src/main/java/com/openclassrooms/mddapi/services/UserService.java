package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.UserNotFoundException;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payloads.requests.UpdateUserDetailsRequest;
import com.openclassrooms.mddapi.payloads.responses.UserResponse;
import com.openclassrooms.mddapi.repositories.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service gérant les opérations liées aux utilisateurs.
 * Implémente la logique métier pour la gestion des profils utilisateurs.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Récupère le profil de l'utilisateur connecté.
     *
     * @param authentication L'authentification de l'utilisateur connecté
     * @return Les informations du profil utilisateur
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     */
    @Transactional(readOnly = true)
    public UserResponse getCurrentUserProfile(Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        return UserResponse.builder()
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    /**
     * Met à jour le profil de l'utilisateur connecté.
     *
     * @param updateUserDetailsRequest Les nouvelles informations du profil
     * @param authentication L'authentification de l'utilisateur connecté
     * @return Les informations mises à jour du profil utilisateur
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     */
    @Transactional
    public UserResponse updateUserProfile(UpdateUserDetailsRequest updateUserDetailsRequest, Authentication authentication) {
        User user = getUserFromAuthentication(authentication);
        
        // Vérifier si l'email est déjà utilisé par un autre utilisateur
        if (!user.getEmail().equals(updateUserDetailsRequest.getEmail())) {
            userRepository.findByEmail(updateUserDetailsRequest.getEmail())
                    .ifPresent(existingUser -> {
                        throw new IllegalArgumentException("L'adresse email est déjà utilisée");
                    });
        }

        user.setName(updateUserDetailsRequest.getName());
        user.setEmail(updateUserDetailsRequest.getEmail());
        
        User updatedUser = userRepository.save(user);
        return UserResponse.builder()
                .name(updatedUser.getName())
                .email(updatedUser.getEmail())
                .build();
    }

    /**
     * Récupère l'utilisateur à partir de l'authentification.
     *
     * @param authentication L'authentification de l'utilisateur
     * @return L'utilisateur correspondant
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     */
    private User getUserFromAuthentication(Authentication authentication) {
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé avec l'email : " + email));
    }
} 