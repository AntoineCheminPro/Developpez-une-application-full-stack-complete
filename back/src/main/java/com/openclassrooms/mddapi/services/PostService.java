package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.PostNotFoundException;
import com.openclassrooms.mddapi.exceptions.TopicNotFoundException;
import com.openclassrooms.mddapi.exceptions.UserNotFoundException;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.payloads.requests.PostWithTopicRequest;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.repositories.TopicRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Service gérant les opérations liées aux posts.
 * Permet la création, la récupération et la gestion des posts et de leurs commentaires.
 */
@Data
@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final TopicRepository topicRepository;
    private final CommentRepository commentRepository;

    public PostService(
            PostRepository postRepository,
            UserRepository userRepository,
            TopicRepository topicRepository,
            CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.topicRepository = topicRepository;
        this.commentRepository = commentRepository;
    }

    /**
     * Récupère tous les posts.
     *
     * @return La liste de tous les posts
     */
    public List<Post> getAll() {
        return postRepository.findAll();
    }

    /**
     * Récupère le flux de posts pour un utilisateur donné.
     * Le flux contient les posts des topics auxquels l'utilisateur est abonné.
     *
     * @param userEmail L'email de l'utilisateur
     * @return La liste des posts du flux
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     */
    public List<Post> getFeed(final String userEmail) {
        var user = userRepository.findByEmail(userEmail);
        if (user.isEmpty()) {
            throw new UserNotFoundException("Utilisateur non trouvé.");
        }
        return postRepository.findPostsBySubscriptionUserId(user.get().getId());
    }

    /**
     * Récupère un post par son ID.
     *
     * @param id L'ID du post
     * @return Le post trouvé
     * @throws PostNotFoundException Si le post n'est pas trouvé
     */
    public Post getById(final Integer id) {
        var post = postRepository.findById(id);
        return post.orElseThrow(() -> new PostNotFoundException("Post non trouvé."));
    }

    /**
     * Crée un nouveau post dans un topic.
     *
     * @param topicId L'ID du topic
     * @param userEmail L'email de l'utilisateur qui crée le post
     * @param postRequest Les données du post
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     * @throws TopicNotFoundException Si le topic n'est pas trouvé
     */
    public void createFromRequest(
            final Integer topicId,
            final String userEmail,
            final PostWithTopicRequest postRequest) {
        
        var owner = userRepository.findByEmail(userEmail);
        if (owner.isEmpty()) {
            throw new UserNotFoundException("Utilisateur non trouvé.");
        }

        var topic = topicRepository.findById(topicId);
        if (topic.isEmpty()) {
            throw new TopicNotFoundException("Topic non trouvé.");
        }

        var post = Post.builder()
                .title(postRequest.getTitle())
                .description(postRequest.getDescription())
                .createdAt(LocalDateTime.now())
                .topic(topic.get())
                .owner(owner.get())
                .build();

        postRepository.save(post);
    }

    /**
     * Récupère tous les commentaires d'un post.
     *
     * @param postId L'ID du post
     * @return La liste des commentaires
     */
    public List<Comment> getAllComments(final Integer postId) {
        return commentRepository.findByPostId(postId);
    }
}
