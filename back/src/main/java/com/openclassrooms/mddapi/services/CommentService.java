package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.exceptions.PostNotFoundException;
import com.openclassrooms.mddapi.exceptions.UserNotFoundException;
import com.openclassrooms.mddapi.models.Comment;
import com.openclassrooms.mddapi.payloads.requests.CommentPostRequest;
import com.openclassrooms.mddapi.repositories.CommentRepository;
import com.openclassrooms.mddapi.repositories.PostRepository;
import com.openclassrooms.mddapi.repositories.UserRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

/**
 * Service gérant les opérations liées aux commentaires.
 * Permet la création et la gestion des commentaires sur les posts.
 */
@Data
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final PostRepository postRepository;

    public CommentService(
            CommentRepository commentRepository,
            UserRepository userRepository,
            PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.postRepository = postRepository;
    }

    /**
     * Crée un nouveau commentaire sur un post.
     *
     * @param postId L'ID du post sur lequel commenter
     * @param userEmail L'email de l'utilisateur qui commente
     * @param commentPostRequest Les données du commentaire
     * @throws UserNotFoundException Si l'utilisateur n'est pas trouvé
     * @throws PostNotFoundException Si le post n'est pas trouvé
     */
    public void createCommentFromRequest(
            final Integer postId,
            final String userEmail,
            CommentPostRequest commentPostRequest) {
        
        var owner = userRepository.findByEmail(userEmail);
        if (owner.isEmpty()) {
            throw new UserNotFoundException("Utilisateur non trouvé.");
        }

        var post = postRepository.findById(postId);
        if (post.isEmpty()) {
            throw new PostNotFoundException("Post non trouvé.");
        }

        var comment = Comment.builder()
                .comment(commentPostRequest.getComment())
                .createdAt(LocalDateTime.now())
                .owner(owner.get())
                .post(post.get())
                .build();

        commentRepository.save(comment);
    }
}
