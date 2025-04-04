# P6-Full-Stack-reseau-dev

## Architecture globale

Le projet suit une architecture en trois couches :
- **Frontend** : Application Angular 18.0.0
- **Backend** : API REST Spring Boot 3.2.3
- **Base de données** : MySQL 8.0

## Front

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0.

### Prérequis

- Node.js (version 18 ou supérieure)
- npm (version 9 ou supérieure)
- Angular CLI (version 18 ou supérieure)

### Installation

N'oubliez pas d'installer les dépendances avant de démarrer (`npm install`).

### Serveur de développement

#### Mode standard
```bash
npm start
```

#### Mode développement avec données simulées
```bash
npm run dev
```
Le mode développement utilise un service personnalisé de données simulées. Cela permet de :
- Développer l'interface sans backend
- Tester différents scénarios d'affichage
- Prototyper rapidement les fonctionnalités

Les données simulées sont configurées dans `environment.development.ts` et respectent la structure de l'API. Le service est implémenté dans `core/services/faker.service.ts`.

#### Mode avec données simulées avancées
```bash
npm run faker
```

#### Mode production
```bash
npm run build
```

Naviguez vers `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

### Tests

```bash
# Exécuter les tests unitaires
npm test
```

Les tests utilisent Jest et suivent les bonnes pratiques :
- Tests unitaires pour les composants
- Tests d'intégration pour les services
- Mocks pour les appels API
- Tests avec et sans données simulées

### Build

```bash
npm run build
```
Les artefacts de build seront stockés dans le répertoire `dist/`.

### Watch mode (développement)
```bash
npm run watch
```
Cette commande permet de construire l'application en mode watch, ce qui est utile pour le développement.

### Configuration des environnements

- `environment.ts` : Configuration par défaut (sans Faker)
- `environment.development.ts` : Configuration avec Faker activé
- `environment.prod.ts` : Configuration pour la production

### Structure du projet

- `src/app/components` : Composants réutilisables
  - `header` : En-tête de l'application
  - `footer` : Pied de page
  - `navbar` : Barre de navigation
  - `backlink` : Lien de retour
  - `post-card` : Carte d'article
  - `topic-card` : Carte de thème
  - `comment` : Composant de commentaire
  - `post-form` : Formulaire d'article
  - `topic-form` : Formulaire de thème
  - `comment-form` : Formulaire de commentaire
- `src/app/pages` : Pages de l'application
- `src/app/core` : Services et fonctionnalités principales
- `src/app/shared` : Utilitaires et interfaces partagées

### Conventions de nommage

- **CSS** : Méthodologie BEM (Block Element Modifier)
- **Composants** : Nommage descriptif avec suffixe du type
- **Services** : Suffixe 'Service'
- **Interfaces** : Préfixe 'I' ou suffixe 'Interface'

### Routes principales

- `/home` : Page d'accueil (sans header)
- `/login` : Page de connexion
- `/register` : Page d'inscription
- `/posts` : Liste des articles
- `/posts/:id` : Détail d'un article
- `/topics` : Liste des thèmes
- `/topics/:id` : Détail d'un thème
- `/user` : Profil utilisateur

### Navigation

- Le header est masqué sur la page d'accueil (`/home`)
- La navbar est masquée sur les pages d'authentification (`/login`, `/register`) et la page d'accueil
- Le backlink est affiché sur les pages de détails (`/posts/:id`, `/topics/:id`) et les pages d'authentification

### UI Library

Le projet utilise `@angular/material`, une des bibliothèques UI les plus populaires de l'écosystème Angular. Vous pouvez consulter la documentation ici : https://material.angular.io/

### Gestion de version

Le projet utilise GitFlow pour la gestion des branches :
- `master` : Code en production
- `develop` : Branche principale de développement
- `feature/*` : Nouvelles fonctionnalités
- `back-develop-*` : Développement backend
- `front-develop-*` : Développement frontend

## Back

### Prérequis
- Java 21
- Maven
- MySQL

### Configuration
1. Créez un fichier `secrets.properties` à la racine du projet backend avec :
```properties
mysql-root-pass=votre_mot_de_passe_mysql
jwt-secret-pass=votre_secret_jwt
```

2. Assurez-vous que MySQL est en cours d'exécution sur le port 3306

### Installation et démarrage

#### Windows PowerShell
```powershell
cd Developpez-une-application-full-stack-complete/back
mvn spring-boot:run
```

#### Linux/MacOS
```bash
cd Developpez-une-application-full-stack-complete/back
mvn spring-boot:run
```

### Documentation API (Swagger)

La documentation de l'API est disponible via Swagger UI. Une fois l'application démarrée, vous pouvez y accéder de deux façons :

1. **Interface Swagger UI (recommandée)**
   - URL : `http://localhost:8080/swagger-ui.html`
   - Interface interactive permettant de :
     - Explorer tous les endpoints de l'API
     - Tester les requêtes directement
     - Voir les modèles de données
     - Consulter les schémas de requêtes et réponses

2. **Documentation OpenAPI brute**
   - URL : `http://localhost:8080/v3/api-docs`
   - Documentation au format JSON

### Points d'accès publics
Les endpoints suivants sont accessibles sans authentification :
- `/api/auth/register` : Inscription
- `/api/auth/login` : Connexion
- `/swagger-ui.html` : Interface Swagger
- `/v3/api-docs` : Documentation OpenAPI

### Authentification
Pour les endpoints protégés :
1. Utilisez d'abord `/api/auth/login` pour obtenir un token JWT
2. Ajoutez le token dans le header `Authorization: Bearer <votre_token>`

### Structure du projet
```
back/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/openclassrooms/mddapi/
│   │   │       ├── controllers/
│   │   │       ├── models/
│   │   │       ├── repositories/
│   │   │       ├── security/
│   │   │       └── services/
│   │   └── resources/
│   │       ├── application.properties
│   │       └── data.sql
│   └── pom.xml
```

### Technologies utilisées
- Spring Boot 3.2.4
- Spring Security avec JWT
- Spring Data JPA
- MySQL
- Lombok
- Swagger/OpenAPI

### Documentation

#### Frontend
```bash
# Générer la documentation
ng build --prod
```

#### Backend
```bash
# Générer la documentation JavaDoc
mvn javadoc:javadoc
```
La documentation est accessible ici : `/Developpez-une-application-full-stack-complete/back/target/site/apidocs/index.html`

## Base de données

### MySQL

Le projet utilise MySQL comme système de gestion de base de données relationnelle.

#### Configuration
- **Version** : MySQL 8.0 ou supérieure
- **Port par défaut** : 3306
- **Nom de la base** : `mdd_db` (créée automatiquement au démarrage)
- **Utilisateur** : `root` (configurable dans `secrets.properties`)
- **Mot de passe** : Défini dans `secrets.properties` (propriété `mysql-root-pass`)

#### Structure de la base de données

La base de données est initialisée automatiquement au démarrage de l'application avec le script `data.sql` qui :
- Crée les tables nécessaires
- Insère des données de test
- Configure les relations entre les tables

#### Tables principales
- `users` : Utilisateurs de l'application
- `topics` : Thèmes de discussion
- `posts` : Articles publiés
- `comments` : Commentaires sur les articles
- `user_topics` : Abonnements des utilisateurs aux thèmes

#### Sécurité
- Les mots de passe sont hashés avec BCrypt
- Les tokens JWT sont utilisés pour l'authentification
- Les requêtes SQL sont protégées contre les injections via JPA

#### Sauvegarde et restauration
```bash
# Sauvegarder la base de données
mysqldump -u root -p mdd_db > backup.sql

# Restaurer la base de données
mysql -u root -p mdd_db < backup.sql
```
