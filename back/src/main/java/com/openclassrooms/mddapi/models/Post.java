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
 * Entité représentant un post dans l'application.
 * Un post est créé par un utilisateur (owner) et appartient à un topic spécifique.
 * Les dates de création et de modification sont automatiquement gérées.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "posts")
@EntityListeners(AuditingEntityListener.class)
public class Post {

    /**
     * Identifiant unique du post.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Titre du post.
     * Limité à 255 caractères et obligatoire.
     */
    @Column(nullable = false, length = 255)
    private String title;

    /**
     * Description détaillée du post.
     * Limitée à 2000 caractères.
     */
    @Column(length = 2000)
    private String description;

    /**
     * Date de création du post.
     * Générée automatiquement et non modifiable.
     */
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification du post.
     * Mise à jour automatiquement lors des modifications.
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;

    /**
     * Utilisateur ayant créé le post.
     * Chargement lazy pour optimiser les performances.
     */
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = User.class)
    @JoinColumn(name = "user_id")
    private User owner;

    /**
     * Topic auquel ce post appartient.
     * Chargement lazy pour optimiser les performances.
     */
    @ManyToOne(fetch = FetchType.LAZY, targetEntity = Topic.class)
    @JoinColumn(name = "topic_id")
    private Topic topic;
}
