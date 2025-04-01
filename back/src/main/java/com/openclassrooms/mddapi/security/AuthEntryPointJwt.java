package com.openclassrooms.mddapi.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.openclassrooms.mddapi.payloads.responses.ApiErrorResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;

/**
 * Point d'entrée pour la gestion des erreurs d'authentification JWT.
 * 
 * Cette classe gère les réponses aux requêtes non authentifiées,
 * en renvoyant une réponse JSON formatée avec les détails de l'erreur.
 */
@Component
public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    /**
     * Gère les erreurs d'authentification en renvoyant une réponse JSON.
     *
     * @param request La requête HTTP qui a causé l'erreur
     * @param response La réponse HTTP à renvoyer
     * @param authException L'exception d'authentification
     * @throws IOException En cas d'erreur lors de l'écriture de la réponse
     */
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException)
            throws IOException {

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

        var errorApiResponse = new ApiErrorResponse(
                HttpServletResponse.SC_UNAUTHORIZED,
                authException.getMessage(),
                LocalDateTime.now()
        );

        final ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.writeValue(response.getOutputStream(), errorApiResponse);
    }
}
