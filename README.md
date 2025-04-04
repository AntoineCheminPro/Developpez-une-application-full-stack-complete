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
ng dev
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
│   └── test/
└── pom.xml
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
