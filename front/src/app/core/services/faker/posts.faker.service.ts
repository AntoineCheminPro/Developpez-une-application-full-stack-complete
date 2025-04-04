import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Post } from '@core/models/posts/post.interface';
import { Comment } from '@core/models/posts/comment.interface';
import { IPostRequest } from '@core/payloads/posts/post.request.interface';
import { FetchService } from '../fetch.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsFakerService extends FetchService {
  private readonly FAKE_DELAY = 1000;
  protected override isFetchingData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(http: HttpClient) {
    super(http);
  }

  public getFeed(): Observable<Post[]> {
    this.isFetchingData$.next(true);
    const today = new Date();
    const dates = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date;
    });

    const topics = [
      { id: '1', name: 'Technologie' },
      { id: '2', name: 'Science' },
      { id: '3', name: 'Cuisine' }
    ];

    const authors = [
      'John Doe',
      'Jane Smith',
      'Alice Johnson',
      'Bob Wilson'
    ];

    const fakePosts: Post[] = [
      {
        id: '1',
        topicId: topics[0].id,
        topicName: topics[0].name,
        title: 'Les dernières avancées en IA',
        description: 'Découvrez comment l\'intelligence artificielle transforme notre quotidien. Les systèmes d\'IA sont maintenant capables de générer des images, d\'écrire des textes et même de composer de la musique. Cette révolution technologique soulève de nombreuses questions éthiques et pratiques sur l\'avenir de nos sociétés. Les experts s\'accordent à dire que nous ne sommes qu\'au début de cette transformation majeure.',
        author: authors[0],
        createdAt: dates[0].toISOString()
      },
      {
        id: '2',
        topicId: topics[1].id,
        topicName: topics[1].name,
        title: 'Exploration spatiale en 2024',
        description: 'Les missions spatiales qui vont marquer cette année sont nombreuses et ambitieuses. De SpaceX à la NASA, en passant par l\'ESA et l\'agence spatiale chinoise, les projets d\'exploration de Mars, de la Lune et des astéroïdes se multiplient. Les nouvelles technologies de propulsion et les avancées en matière d\'habitats spatiaux ouvrent des perspectives fascinantes pour l\'humanité.',
        author: authors[1],
        createdAt: dates[1].toISOString()
      },
      {
        id: '3',
        topicId: topics[2].id,
        topicName: topics[2].name,
        title: 'Cuisine végétarienne moderne',
        description: 'Les nouvelles tendances dans la cuisine végétarienne révolutionnent notre façon de manger. Des substituts de viande aux techniques de fermentation innovantes, en passant par la redécouverte de légumes anciens, les chefs du monde entier repoussent les limites de la créativité culinaire. L\'impact environnemental réduit et les bienfaits pour la santé sont également des facteurs clés de cette évolution.',
        author: authors[2],
        createdAt: dates[2].toISOString()
      },
      {
        id: '4',
        topicId: topics[0].id,
        topicName: topics[0].name,
        title: 'Le futur de la réalité virtuelle',
        description: 'La réalité virtuelle va révolutionner notre façon de travailler, d\'apprendre et de nous divertir. Les nouveaux casques VR offrent une immersion sans précédent, avec des résolutions 4K par œil et un champ de vision élargi. Les applications professionnelles se multiplient, de la formation médicale à la conception architecturale, en passant par les réunions virtuelles. Le métavers promet de créer un nouvel espace social et économique.',
        author: authors[3],
        createdAt: dates[3].toISOString()
      },
      {
        id: '5',
        topicId: topics[1].id,
        topicName: topics[1].name,
        title: 'Découvertes en biologie marine',
        description: 'Les nouvelles espèces découvertes dans les abysses continuent de nous surprendre. Les explorations des fosses océaniques à plus de 10 000 mètres de profondeur révèlent des créatures aux adaptations extraordinaires. Les chercheurs étudient notamment leur résistance aux conditions extrêmes de pression et d\'obscurité, qui pourrait avoir des applications en biotechnologie et en médecine.',
        author: authors[0],
        createdAt: dates[4].toISOString()
      },
      {
        id: '6',
        topicId: topics[2].id,
        topicName: topics[2].name,
        title: 'Cuisine fusion asiatique',
        description: 'Le mélange des saveurs d\'Asie dans la cuisine moderne crée des expériences gustatives uniques. Des techniques traditionnelles japonaises combinées aux épices thaïlandaises, en passant par les influences coréennes et vietnamiennes, cette fusion culinaire reflète la mondialisation de notre culture gastronomique. Les chefs innovent en respectant l\'authenticité des ingrédients tout en créant des plats résolument contemporains.',
        author: authors[1],
        createdAt: dates[5].toISOString()
      }
    ];

    return of(fakePosts).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public getComments(postId: string): Observable<Comment[]> {
    this.isFetchingData$.next(true);
    const fakeComments: Comment[] = [
      {
        id: '1',
        username: 'John Doe',
        text: 'Très intéressant !',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        username: 'Jane Smith',
        text: 'Je suis d\'accord avec vous.',
        createdAt: new Date().toISOString()
      }
    ];

    return of(fakeComments).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public createPostInTopic(postTopicId: string, postRequest: IPostRequest): Observable<void> {
    this.isFetchingData$.next(true);
    return of(void 0).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public createComment(postId: string, commentText: string): Observable<void> {
    this.isFetchingData$.next(true);
    return of(void 0).pipe(
      delay(this.FAKE_DELAY),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  public override getIsFetching(): Observable<boolean> {
    return this.isFetchingData$.asObservable();
  }
} 