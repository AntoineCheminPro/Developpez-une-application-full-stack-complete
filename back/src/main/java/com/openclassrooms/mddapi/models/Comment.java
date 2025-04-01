package com.openclassrooms.mddapi.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

/**
 * Entité représentant un commentaire dans l'application.
 * Un commentaire est associé à un post et à un utilisateur (owner).
 * Les dates de création et de modification sont automatiquement gérées.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "comments")
@EntityListeners(AuditingEntityListener.class)
public class Comment {

    /**
     * Identifiant unique du commentaire.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Post auquel ce commentaire est associé.
     * Chargement lazy pour optimiser les performances.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    /**
     * Contenu du commentaire.
     * Limité à 2000 caractères.
     */
    @Column(nullable = false, length = 2000)
    private String comment;

    /**
     * Date de création du commentaire.
     * Générée automatiquement et non modifiable.
     */
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification du commentaire.
     * Mise à jour automatiquement lors des modifications.
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    /**
     * Utilisateur ayant créé le commentaire.
     * Chargement lazy pour optimiser les performances.
     */
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User owner;
}
