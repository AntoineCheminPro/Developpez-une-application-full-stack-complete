package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.payloads.responses.SimpleOutputMessageResponse;
import com.openclassrooms.mddapi.payloads.responses.TopicResponse;
import com.openclassrooms.mddapi.security.services.JwtService;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Contrôleur gérant les opérations liées aux topics.
 * Expose les endpoints pour la gestion des topics et des abonnements.
 */
@RestController
@RequestMapping("topics")
public class TopicController {

    private static final String BEARER_TOKEN_STRING = "Bearer ";
    private final JwtService jwtService;
    private final TopicService topicService;
    private final SubscriptionService topicsSubscriptionService;

    public TopicController(TopicService topicService, JwtService jwtService, SubscriptionService topicsSubscriptionService) {
        this.jwtService = jwtService;
        this.topicService = topicService;
        this.topicsSubscriptionService = topicsSubscriptionService;
    }

    /**
     * Récupère tous les topics disponibles.
     *
     * @return La liste des topics
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TopicResponse>> getAll() {
        var topics = topicService.getAll();
        var topicsResponses = new ArrayList<TopicResponse>();
        
        for (var topic : topics) {
            topicsResponses.add(toTopicResponse(topic));
        }

        return new ResponseEntity<>(topicsResponses, HttpStatus.OK);
    }

    /**
     * Récupère tous les topics auxquels l'utilisateur est abonné.
     *
     * @param authorizationHeader Le token d'authentification
     * @return La liste des topics abonnés
     */
    @GetMapping(value = "/subscribed", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TopicResponse>> getSubscribed(
            @RequestHeader("Authorization") String authorizationHeader) {
        
        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);

        var allSubscriptions = topicsSubscriptionService.getAllSubscribed(userFromToken);
        var topicsResponses = new ArrayList<TopicResponse>();
        
        if (!allSubscriptions.isEmpty()) {
            for (var topicId : allSubscriptions) {
                topicsResponses.add(toTopicResponse(topicService.getById(topicId)));
            }
        }

        return new ResponseEntity<>(topicsResponses, HttpStatus.OK);
    }

    /**
     * Gère l'abonnement ou le désabonnement d'un utilisateur à un topic.
     *
     * @param topicId L'ID du topic
     * @param subscribe true pour s'abonner, false pour se désabonner
     * @param authorizationHeader Le token d'authentification
     * @return Un message de confirmation
     */
    @PostMapping(value = "/subscribe", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleOutputMessageResponse> subscribeOrUnsubscribeTopicForUser(
            @RequestParam final Integer topicId,
            @RequestParam final Boolean subscribe,
            @RequestHeader("Authorization") String authorizationHeader) {

        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);

        topicsSubscriptionService.manageSubscription(subscribe, userFromToken, topicId);

        var message = subscribe
                ? new SimpleOutputMessageResponse("Abonnement au topic effectué avec succès.")
                : new SimpleOutputMessageResponse("Désabonnement du topic effectué avec succès.");
        
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    /**
     * Convertit un Topic en TopicResponse.
     *
     * @param topic Le topic à convertir
     * @return Le TopicResponse correspondant
     */
    private TopicResponse toTopicResponse(Topic topic) {
        if (topic == null) {
            return new TopicResponse();
        }

        return TopicResponse.builder()
                .id(topic.getId())
                .title(topic.getTitle())
                .description(topic.getDescription())
                .build();
    }
}
