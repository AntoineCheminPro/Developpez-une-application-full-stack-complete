package com.openclassrooms.mddapi.security.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

/**
 * Service de gestion des tokens JWT.
 * 
 * Ce service gère la génération, la validation et l'extraction des informations
 * des tokens JWT utilisés pour l'authentification.
 */
@Service
@ConfigurationProperties(prefix = "application.security.jwt")
public class JwtService {

    private long expiration;

    private String secretKey;

    public void setExpiration(long expiration) {
        this.expiration = expiration;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    /**
     * Génère un token JWT avec les claims et les détails de l'utilisateur.
     *
     * @param claims Les claims à inclure dans le token
     * @param userDetails Les détails de l'utilisateur
     * @return Le token JWT généré
     */
    public String generateToken(Map<String, Object> claims, UserDetails userDetails) {
        return buildToken(claims, userDetails, expiration);
    }

    /**
     * Construit un token JWT avec les paramètres spécifiés.
     *
     * @param claims Les claims à inclure
     * @param userDetails Les détails de l'utilisateur
     * @param expiration La durée de validité du token
     * @return Le token JWT construit
     */
    private String buildToken(
            Map<String, Object> claims,
            UserDetails userDetails,
            long expiration) {
        var authorities = userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .toList();
        return Jwts
                .builder()
                .claims(claims)
                .claim("authorities", authorities)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey())
                .compact();
    }

    /**
     * Récupère la clé de signature pour les tokens JWT.
     *
     * @return La clé de signature
     */
    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
    }

    /**
     * Vérifie si un token JWT est valide pour un utilisateur donné.
     *
     * @param token Le token à vérifier
     * @param userDetails Les détails de l'utilisateur
     * @return true si le token est valide, false sinon
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            final String username = extractUserName(token);
            return userDetails.getUsername().equals(username) && !isTokenExpired(token);
        }
        catch (Exception ignored) {}
        return false;
    }

    /**
     * Vérifie si un token JWT est expiré.
     *
     * @param token Le token à vérifier
     * @return true si le token est expiré, false sinon
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extrait la date d'expiration d'un token JWT.
     *
     * @param token Le token à analyser
     * @return La date d'expiration du token
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extrait le nom d'utilisateur d'un token JWT.
     *
     * @param token Le token à analyser
     * @return Le nom d'utilisateur
     */
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extrait une claim spécifique d'un token JWT.
     *
     * @param token Le token à analyser
     * @param claimsResolver La fonction pour extraire la claim
     * @return La claim extraite
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Récupère toutes les claims d'un token JWT.
     *
     * @param token Le token à analyser
     * @return Les claims du token
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
