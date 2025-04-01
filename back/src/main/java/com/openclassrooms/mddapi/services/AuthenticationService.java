package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.UserAlreadyExistException;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payloads.requests.LoginUserRequest;
import com.openclassrooms.mddapi.payloads.requests.RegisterUserRequest;
import com.openclassrooms.mddapi.payloads.responses.AuthenticationResponse;
import com.openclassrooms.mddapi.repositories.RoleRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import com.openclassrooms.mddapi.security.services.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Service gérant l'authentification des utilisateurs.
 * Permet l'inscription et la connexion des utilisateurs avec génération de token JWT.
 */
@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public void registerUser(RegisterUserRequest registerUserRequest) {
        var userRole = roleRepository.findByName("USER")
                .orElseThrow(() -> new IllegalStateException("Le rôle utilisateur n'a pas été trouvé ou n'est pas initialisé."));
        var existingUser = userRepository.findByEmail(registerUserRequest.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistException("Un utilisateur avec l'email " + registerUserRequest.getEmail() + " existe déjà.");
        }
        var user = User.builder()
                .name(registerUserRequest.getName())
                .email(registerUserRequest.getEmail())
                .password(passwordEncoder.encode(registerUserRequest.getPassword()))
                .roles(List.of(userRole))
                .build();

        userRepository.save(user);
    }

    public AuthenticationResponse loginUser(LoginUserRequest loginUserRequest) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserRequest.getEmail(),
                        loginUserRequest.getPassword()
                )
        );
        return getToken((User)authentication.getPrincipal());
    }

    private AuthenticationResponse getToken(User user) {
        var claims = new HashMap<String, Object>();
        claims.put("fullName", user.getName());
        var jwtToken = jwtService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
