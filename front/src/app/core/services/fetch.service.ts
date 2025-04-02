import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Injectable } from "@angular/core";

/**
 * Service abstrait pour la gestion des requêtes HTTP.
 * Fournit des fonctionnalités communes pour les services qui effectuent des requêtes HTTP.
 */
@Injectable({
  providedIn: 'root',
})
export abstract class FetchService {
  protected readonly isFetchingData$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(protected readonly httpClient: HttpClient) {}

  /**
   * Effectue une requête GET HTTP avec gestion des états de chargement.
   * 
   * @param endpoint L'URL de l'endpoint à appeler
   * @returns Un Observable contenant la réponse de la requête
   */
  protected fetch<T>(endpoint: string): Observable<T> {
    this.isFetchingData$.next(true);
    return this.httpClient.get<T>(endpoint).pipe(
      tap(() => this.isFetchingData$.next(false)),
      catchError((error: Error) => {
        this.isFetchingData$.next(false);
        throw error;
      }),
      finalize(() => this.isFetchingData$.next(false))
    );
  }

  /**
   * Récupère l'état de chargement actuel.
   * 
   * @returns Un Observable contenant l'état de chargement
   */
  public getIsFetching(): Observable<boolean> {
    return this.isFetchingData$.asObservable();
  }
}
