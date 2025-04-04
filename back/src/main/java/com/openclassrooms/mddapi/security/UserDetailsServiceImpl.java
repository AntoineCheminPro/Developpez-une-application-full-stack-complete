package com.openclassrooms.mddapi.security;

import com.openclassrooms.mddapi.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * Service d'implémentation de UserDetailsService pour l'authentification.
 * 
 * Cette classe gère le chargement des détails de l'utilisateur à partir
 * de la base de données pour l'authentification Spring Security.
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * Constructeur du service.
     *
     * @param userRepository Le repository pour accéder aux données utilisateur
     */
    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Charge les détails d'un utilisateur par son email.
     *
     * @param email L'email de l'utilisateur à rechercher
     * @return Les détails de l'utilisateur
     * @throws UsernameNotFoundException Si l'utilisateur n'est pas trouvé
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé."));
    }
}
