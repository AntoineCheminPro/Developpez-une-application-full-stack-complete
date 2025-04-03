# P6-Full-Stack-reseau-dev

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
ng serve
```

#### Mode développement avec Faker
```bash
ng serve --configuration=development
```

#### Mode production
```bash
ng serve --configuration=production
```

Naviguez vers `http://localhost:4200/`. L'application se rechargera automatiquement si vous modifiez les fichiers sources.

### Build

```bash
ng build
```
Les artefacts de build seront stockés dans le répertoire `dist/`.

### Configuration des environnements

- `environment.ts` : Configuration par défaut (sans Faker)
- `environment.development.ts` : Configuration avec Faker activé
- `environment.prod.ts` : Configuration pour la production

### Structure du projet

- `src/app/components` : Composants réutilisables
- `src/app/pages` : Pages de l'application
- `src/app/core` : Services et fonctionnalités principales
- `src/app/shared` : Utilitaires et interfaces partagées

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

Note : L'utilisation de Material est recommandée mais n'est pas obligatoire. Vous pouvez l'enlever si vous préférez.

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
