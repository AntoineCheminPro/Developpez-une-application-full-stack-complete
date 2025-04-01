package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.UserAlreadyExistException;
import com.openclassrooms.mddapi.exceptions.UserNotFoundException;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payloads.requests.UpdateUserDetailsRequest;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

/**
 * Service gérant les opérations liées aux utilisateurs.
 * Permet la gestion des utilisateurs, leur authentification et la mise à jour de leurs informations.
 */
@Data
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Récupère un utilisateur par son ID.
     *
     * @param id L'ID de l'utilisateur
     * @return L'utilisateur trouvé
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     */
    public User getById(final Integer id) {
        var user = userRepository.findById(id);
        return user.orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé."));
    }

    /**
     * Récupère un utilisateur par son email.
     *
     * @param email L'email de l'utilisateur
     * @return L'utilisateur trouvé
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     */
    public User getByEmail(final String email) {
        var user = userRepository.findByEmail(email);
        return user.orElseThrow(() -> new UserNotFoundException("Utilisateur non trouvé."));
    }

    /**
     * Met à jour les informations d'un utilisateur.
     *
     * @param user L'utilisateur à mettre à jour
     * @param updateEmail Indique si l'email doit être mis à jour
     * @param userDetailsRequest Les nouvelles informations de l'utilisateur
     * @throws UserAlreadyExistException Si l'email est déjà utilisé par un autre utilisateur
     */
    public void updateFromRequest(
            final User user,
            final boolean updateEmail,
            final UpdateUserDetailsRequest userDetailsRequest) {
        
        if (updateEmail) {
            // Vérifie si un utilisateur avec cet email existe déjà
            var userInDBfromEmail = userRepository.findByEmail(userDetailsRequest.getEmail());
            if (userInDBfromEmail.isPresent()) {
                throw new UserAlreadyExistException(
                    MessageFormat.format("Un compte existe déjà avec l''adresse email {0}.", userDetailsRequest.getEmail())
                );
            }
            user.setEmail(userDetailsRequest.getEmail());
        }

        user.setName(userDetailsRequest.getName());
        userRepository.save(user);
    }
}
