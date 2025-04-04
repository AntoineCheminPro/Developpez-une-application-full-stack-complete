/**
 * Provider pour le service Storage.
 * Fournit une instance de sessionStorage par défaut.
 */
export const storageProvider = {
  provide: Storage,
  useValue: sessionStorage
}; 