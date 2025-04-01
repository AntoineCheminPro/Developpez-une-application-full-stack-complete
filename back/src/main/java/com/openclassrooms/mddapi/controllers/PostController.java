package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.models.Post;
import com.openclassrooms.mddapi.payloads.requests.CommentPostRequest;
import com.openclassrooms.mddapi.payloads.requests.PostWithTopicRequest;
import com.openclassrooms.mddapi.payloads.responses.CommentResponse;
import com.openclassrooms.mddapi.payloads.responses.PostResponse;
import com.openclassrooms.mddapi.payloads.responses.SimpleOutputMessageResponse;
import com.openclassrooms.mddapi.security.services.JwtService;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.utils.DateFormatter;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Contrôleur gérant les opérations liées aux posts.
 * Expose les endpoints pour la création, la récupération et la gestion des posts.
 */
@RestController
@RequestMapping("posts")
public class PostController {

    private static final String BEARER_TOKEN_STRING = "Bearer ";
    private final PostService postService;
    private final CommentService commentService;
    private final JwtService jwtService;

    public PostController(PostService postService, CommentService commentService, JwtService jwtService) {
        this.postService = postService;
        this.commentService = commentService;
        this.jwtService = jwtService;
    }

    /**
     * Récupère tous les posts.
     *
     * @return La liste des posts
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostResponse>> getAll() {
        var posts = postService.getAll();
        var postResponses = new ArrayList<PostResponse>();
        
        for (var post : posts) {
            postResponses.add(toPostResponse(post));
        }

        return new ResponseEntity<>(postResponses, HttpStatus.OK);
    }

    /**
     * Récupère tous les posts des topics auxquels l'utilisateur est abonné.
     *
     * @param authorizationHeader Le token d'authentification
     * @return La liste des posts du feed
     */
    @GetMapping(value = "/feed", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostResponse>> getAllPostBySubscribedTopics(
            @RequestHeader("Authorization") String authorizationHeader) {
        
        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);

        var posts = postService.getFeed(userFromToken);
        var postResponses = new ArrayList<PostResponse>();
        
        for (var post : posts) {
            postResponses.add(toPostResponse(post));
        }

        return new ResponseEntity<>(postResponses, HttpStatus.OK);
    }

    /**
     * Récupère un post par son ID.
     *
     * @param id L'ID du post
     * @return Le post demandé
     */
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostResponse> getPostById(@PathVariable("id") final Integer id) {
        var post = postService.getById(id);
        return new ResponseEntity<>(toPostResponse(post), HttpStatus.OK);
    }

    /**
     * Crée un nouveau post.
     *
     * @param topicId L'ID du topic
     * @param postRequest Les données du post
     * @param authorizationHeader Le token d'authentification
     * @return Un message de confirmation
     */
    @PostMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleOutputMessageResponse> addPost(
            @Valid @RequestParam final Integer topicId,
            @Valid @RequestBody PostWithTopicRequest postRequest,
            @RequestHeader("Authorization") String authorizationHeader) {

        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);

        postService.createFromRequest(topicId, userFromToken, postRequest);

        return new ResponseEntity<>(
                new SimpleOutputMessageResponse("Le post a été créé avec succès."),
                HttpStatus.OK
        );
    }

    /**
     * Ajoute un commentaire à un post.
     *
     * @param postId L'ID du post
     * @param commentPostRequest Les données du commentaire
     * @param authorizationHeader Le token d'authentification
     * @return Un message de confirmation
     */
    @PostMapping(value = "{postId}/comments", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<SimpleOutputMessageResponse> addComment(
            @PathVariable("postId") Integer postId,
            @Valid @RequestBody CommentPostRequest commentPostRequest,
            @RequestHeader("Authorization") String authorizationHeader) {

        var jwtToken = authorizationHeader.substring(BEARER_TOKEN_STRING.length());
        var userFromToken = jwtService.extractUserName(jwtToken);

        commentService.createCommentFromRequest(postId, userFromToken, commentPostRequest);

        return new ResponseEntity<>(
                new SimpleOutputMessageResponse("Le commentaire a été créé avec succès."),
                HttpStatus.OK
        );
    }

    /**
     * Récupère tous les commentaires d'un post.
     *
     * @param postId L'ID du post
     * @return La liste des commentaires
     */
    @GetMapping(value = "{postId}/comments", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<CommentResponse>> getAllComments(@PathVariable("postId") Integer postId) {
        var postComments = postService.getAllComments(postId);
        var commentsResponses = new ArrayList<CommentResponse>();
        
        for (var comment : postComments) {
            commentsResponses.add(CommentResponse.builder()
                    .id(comment.getId())
                    .username(comment.getOwner().getName())
                    .text(comment.getComment())
                    .createdAt(comment.getCreatedAt().format(DateFormatter.getFormatter()))
                    .build());
        }

        return new ResponseEntity<>(commentsResponses, HttpStatus.OK);
    }

    /**
     * Convertit un Post en PostResponse.
     *
     * @param post Le post à convertir
     * @return Le PostResponse correspondant
     */
    private PostResponse toPostResponse(Post post) {
        if (post == null) {
            return new PostResponse();
        }

        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .createdAt(post.getCreatedAt().format(DateFormatter.getFormatter()))
                .author(post.getOwner().getName())
                .topicId(post.getTopic().getId())
                .topicName(post.getTopic().getTitle())
                .build();
    }
}
