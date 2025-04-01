package com.openclassrooms.mddapi.payloads.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * Requête d'inscription d'un nouvel utilisateur.
 * Le mot de passe doit respecter les critères de sécurité suivants :
 * - Au moins 8 caractères
 * - Au moins un chiffre
 * - Au moins une lettre minuscule
 * - Au moins une lettre majuscule
 * - Au moins un caractère spécial
 * 
 * @see <a href="https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/util/regex/Pattern.html">Documentation officielle Java Pattern</a>
 * @see <a href="https://regex101.com">Regex101 - Testeur et documentation des expressions régulières</a>
 */
@Data
public class RegisterUserRequest {

    @Email(regexp = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}",
            flags = Pattern.Flag.CASE_INSENSITIVE)
    @NotBlank(message = "L'adresse email est requise")
    private String email;

    @NotBlank(message = "Le nom est requis")
    private String name;

    @NotBlank(message = "Le mot de passe est requis")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8,}$", 
            message = "Le mot de passe doit contenir au moins 8 caractères, un chiffre, une minuscule, une majuscule et un caractère spécial")
    private String password;
}
