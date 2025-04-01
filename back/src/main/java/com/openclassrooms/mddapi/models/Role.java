package com.openclassrooms.mddapi.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Entité représentant un rôle dans l'application.
 * Un rôle peut être attribué à plusieurs utilisateurs (relation many-to-many).
 * Les dates de création et de modification sont automatiquement gérées.
 */
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)
public class Role {

    /**
     * Identifiant unique du rôle.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Nom du rôle.
     * Doit être unique dans la base de données et ne peut pas être null.
     */
    @Column(nullable = false, unique = true)
    private String name;

    /**
     * Liste des utilisateurs ayant ce rôle.
     * Relation bidirectionnelle gérée par le champ 'roles' dans l'entité User.
     * Ignoré dans la sérialisation JSON pour éviter les références circulaires.
     */
    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<User> users;

    /**
     * Date de création du rôle.
     * Générée automatiquement et non modifiable.
     */
    @CreatedDate
    @Column(nullable = true, updatable = false)
    private LocalDateTime createdAt;

    /**
     * Date de dernière modification du rôle.
     * Mise à jour automatiquement lors des modifications.
     */
    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedAt;
}
