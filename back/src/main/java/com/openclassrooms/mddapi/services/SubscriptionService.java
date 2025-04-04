package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.ThemeSubscriptionException;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.repositories.SubscriptionRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service gérant les opérations liées aux abonnements aux topics.
 * Permet la gestion des abonnements et désabonnements des utilisateurs aux différents topics.
 */
@Data
@Service
public class SubscriptionService {

    private final UserService userService;
    private final TopicService topicService;
    private final SubscriptionRepository subscriptionRepository;

    public SubscriptionService(
            UserService userService,
            TopicService topicService,
            SubscriptionRepository subscriptionRepository) {
        this.userService = userService;
        this.topicService = topicService;
        this.subscriptionRepository = subscriptionRepository;
    }

    /**
     * Récupère tous les IDs des topics auxquels un utilisateur est abonné.
     *
     * @param userEmail L'email de l'utilisateur
     * @return La liste des IDs des topics abonnés
     */
    public List<Integer> getAllSubscribed(final String userEmail) {
        var user = userService.getByEmail(userEmail);
        var topicIds = subscriptionRepository.findAllThemeIdsSubscribedByUser(user.getId());
        return topicIds.orElse(new ArrayList<>());
    }

    /**
     * Gère l'abonnement ou le désabonnement d'un utilisateur à un topic.
     *
     * @param subscribe true pour s'abonner, false pour se désabonner
     * @param userEmail L'email de l'utilisateur
     * @param topicId L'ID du topic
     * @throws ThemeSubscriptionException Si l'opération d'abonnement/désabonnement échoue
     */
    public void manageSubscription(
            final boolean subscribe,
            final String userEmail,
            final Integer topicId) {
        
        var user = userService.getByEmail(userEmail);
        var topic = topicService.getById(topicId);
        var userId = user.getId();

        Optional<Subscription> subscription = subscriptionRepository.findUniqueSubscriptionForThemeByUser(topic.getId(), userId);
        
        if (!subscribe) {
            // Suppression de l'abonnement
            if (subscription.isPresent()) {
                subscriptionRepository.deleteByThemeIdAndUserId(topic.getId(), userId);
            } else {
                throw new ThemeSubscriptionException(
                    "Impossible de se désabonner du topic " + topic.getId() + " : aucun abonnement trouvé."
                );
            }
        } else {
            // Création d'un nouvel abonnement
            if (subscription.isPresent()) {
                throw new ThemeSubscriptionException(
                    "Impossible de s'abonner au topic " + topic.getId() + " : un abonnement existe déjà."
                );
            }
            
            var newSubscription = Subscription.builder()
                    .createdAt(LocalDateTime.now())
                    .topic(topic)
                    .user(user)
                    .build();
                    
            subscriptionRepository.save(newSubscription);
        }
    }
}
