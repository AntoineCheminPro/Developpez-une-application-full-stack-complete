package com.openclassrooms.mddapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Entité représentant un utilisateur dans l'application.
 * Implémente UserDetails pour l'authentification Spring Security et Principal pour l'identification.
 * Un utilisateur peut avoir plusieurs rôles et être abonné à plusieurs topics.
 * Les dates de création et de modification sont automatiquement gérées.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "_user") // Le préfixe '_' est utilisé car 'user' est un mot réservé dans certaines bases de données
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {

    /**
     * Identifiant unique de l'utilisateur.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Nom d'affichage de l'utilisateur.
     * Limité à 255 caractères et obligatoire.
     */
    @Column(nullable = false, length = 255)
    private String name;

    /**
     * Mot de passe hashé de l'utilisateur.
     * Limité à 255 caractères et obligatoire.
     */
    @Column(nullable = false, length = 255)
    private String password;

    /**
     * Adresse email de l'utilisateur.
     * Doit être unique et sert d'identifiant de connexion.
     */
    @Column(unique = true, length = 255)
    private String email;

    /**
     * Date de création du compte.
     * Générée automatiquement et non modifiable.
     */
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification du compte.
     * Mise à jour automatiquement lors des modifications.
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    /**
     * Liste des rôles de l'utilisateur.
     * Chargement EAGER car nécessaire pour l'authentification.
     */
    @ManyToMany(fetch = FetchType.EAGER)
    private List<Role> roles;

    // Implémentation de UserDetails

    /**
     * Retourne les autorités accordées à l'utilisateur.
     * Convertit les rôles en GrantedAuthority pour Spring Security.
     *
     * @return Collection des autorités de l'utilisateur
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles
                .stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    /**
     * Retourne l'identifiant unique de l'utilisateur pour l'authentification.
     * Utilise l'email comme identifiant pour la génération/validation du token JWT.
     *
     * @return L'email de l'utilisateur
     */
    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Implémentation de Principal

    @Override
    public String getName() {
        return name;
    }
}
