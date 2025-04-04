package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.TopicNotFoundException;
import com.openclassrooms.mddapi.models.Topic;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service gérant les opérations liées aux topics.
 * Permet la récupération des topics et la gestion de leurs informations.
 */
@Data
@Service
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    /**
     * Récupère tous les topics disponibles.
     *
     * @return La liste de tous les topics
     */
    public List<Topic> getAll() {
        return topicRepository.findAll();
    }

    /**
     * Récupère un topic par son ID.
     *
     * @param id L'ID du topic
     * @return Le topic trouvé
     * @throws TopicNotFoundException Si le topic n'est pas trouvé
     */
    public Topic getById(final Integer id) {
        var topic = topicRepository.findById(id);
        return topic.orElseThrow(() -> new TopicNotFoundException("Topic non trouvé."));
    }
}
