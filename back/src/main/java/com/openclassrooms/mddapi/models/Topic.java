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
 * Entité représentant un topic (thème de discussion) dans l'application.
 * Un topic peut contenir plusieurs posts et avoir plusieurs abonnés.
 * Les dates de création et de modification sont automatiquement gérées.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "topics", uniqueConstraints = {
    @UniqueConstraint(columnNames = "title")
})
@EntityListeners(AuditingEntityListener.class)
public class Topic {

    /**
     * Identifiant unique du topic.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Titre du topic.
     * Limité à 255 caractères et obligatoire.
     * Doit être unique.
     */
    @Column(nullable = false, length = 255, unique = true)
    private String title;

    /**
     * Description détaillée du topic.
     * Limitée à 2000 caractères.
     */
    @Column(length = 2000)
    private String description;

    /**
     * Date de création du topic.
     * Générée automatiquement et non modifiable.
     */
    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification du topic.
     * Mise à jour automatiquement lors des modifications.
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;
}
