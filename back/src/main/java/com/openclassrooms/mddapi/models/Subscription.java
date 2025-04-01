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
 * Entité représentant l'abonnement d'un utilisateur à un topic.
 * Permet de gérer la relation many-to-many entre les utilisateurs et les topics.
 * Les dates de création et de modification sont automatiquement gérées.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "subscriptions")
@EntityListeners(AuditingEntityListener.class)
public class Subscription {

    /**
     * Identifiant unique de l'abonnement.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Utilisateur abonné au topic.
     * Chargement lazy pour optimiser les performances.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    /**
     * Topic auquel l'utilisateur est abonné.
     * Chargement lazy pour optimiser les performances.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id")
    private Topic topic;

    /**
     * Date de création de l'abonnement.
     * Générée automatiquement et non modifiable.
     */
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification de l'abonnement.
     * Mise à jour automatiquement lors des modifications.
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;
}
