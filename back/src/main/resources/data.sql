-- Ajout du rôle par défaut
INSERT IGNORE INTO Role (name, createdAt) VALUES ('USER', CURRENT_TIMESTAMP);

-- Ajout d'un utilisateur par défaut
INSERT INTO _user (name, email, password, createdAt) 
VALUES ('Admin', 'admin@admin.com', '$2a$10$ZZfZRP/Vx3XPL7A0by8Y/ucwe.CaKf445lOxCo4FZs31ezV2YjKVu', CURRENT_TIMESTAMP);

-- Association de l'utilisateur avec le rôle USER
INSERT INTO _user_roles (users_id, roles_id)
SELECT (SELECT id FROM _user WHERE email = 'admin@admin.com'),
       (SELECT id FROM Role WHERE name = 'USER');

-- Ajout des thèmes par défaut
INSERT IGNORE INTO topics (title, description, createdAt) VALUES 
('Développement Web', 'Discussions autour du développement web frontend et backend', CURRENT_TIMESTAMP),
('DevOps', 'Pratiques DevOps, CI/CD, et déploiement', CURRENT_TIMESTAMP),
('Intelligence Artificielle', 'IA, Machine Learning et Data Science', CURRENT_TIMESTAMP),
('Cybersécurité', 'Sécurité informatique et bonnes pratiques', CURRENT_TIMESTAMP),
('Mobile', 'Développement d''applications mobiles iOS et Android', CURRENT_TIMESTAMP),
('Architecture', 'Architecture logicielle et patterns de conception', CURRENT_TIMESTAMP),
('Cloud Computing', 'Services cloud, AWS, Azure, GCP', CURRENT_TIMESTAMP),
('Base de données', 'SQL, NoSQL et gestion des données', CURRENT_TIMESTAMP);

-- Ajout des posts pour chaque catégorie
INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Les fondamentaux de React en 2024', 
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. React est devenu un incontournable du développement frontend moderne.',
       '2024-03-15 10:00:00',
       (SELECT id FROM topics WHERE title = 'Développement Web'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Node.js et Express : Guide complet',
       'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Découvrez comment créer une API REST robuste.',
       '2024-02-28 14:30:00',
       (SELECT id FROM topics WHERE title = 'Développement Web'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Docker : De débutant à expert',
       'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Les containers ont révolutionné le déploiement.',
       '2024-03-10 09:15:00',
       (SELECT id FROM topics WHERE title = 'DevOps'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'CI/CD avec GitHub Actions',
       'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Automatisez vos déploiements.',
       '2024-01-20 16:45:00',
       (SELECT id FROM topics WHERE title = 'DevOps'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Introduction au Deep Learning',
       'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Les réseaux de neurones démystifiés.',
       '2024-03-01 11:20:00',
       (SELECT id FROM topics WHERE title = 'Intelligence Artificielle'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'GPT-4 : Applications pratiques',
       'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit. Explorez les cas d''usage concrets.',
       '2024-02-15 13:40:00',
       (SELECT id FROM topics WHERE title = 'Intelligence Artificielle'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Sécurité des API REST',
       'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum. Protection contre les attaques courantes.',
       '2024-03-12 15:30:00',
       (SELECT id FROM topics WHERE title = 'Cybersécurité'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Zero Trust Architecture',
       'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore. Implémentez une sécurité moderne.',
       '2024-01-30 10:50:00',
       (SELECT id FROM topics WHERE title = 'Cybersécurité'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Flutter vs React Native',
       'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet. Comparaison détaillée des frameworks.',
       '2024-03-08 14:20:00',
       (SELECT id FROM topics WHERE title = 'Mobile'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'SwiftUI : L''avenir d''iOS',
       'Itaque earum rerum hic tenetur a sapiente delectus. Créez des interfaces modernes pour iOS.',
       '2024-02-10 09:30:00',
       (SELECT id FROM topics WHERE title = 'Mobile'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Clean Architecture en pratique',
       'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet. Principes SOLID et patterns modernes.',
       '2024-03-05 16:15:00',
       (SELECT id FROM topics WHERE title = 'Architecture'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Microservices : Bonnes pratiques',
       'Consectetur, adipisci velit, sed quia non numquam eius modi tempora. Architectures distribuées efficaces.',
       '2024-01-25 11:45:00',
       (SELECT id FROM topics WHERE title = 'Architecture'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'AWS Lambda et Serverless',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt. Architectures sans serveur.',
       '2024-03-18 10:10:00',
       (SELECT id FROM topics WHERE title = 'Cloud Computing'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Kubernetes en production',
       'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis. Orchestration de containers.',
       '2024-02-20 15:25:00',
       (SELECT id FROM topics WHERE title = 'Cloud Computing'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'MongoDB vs PostgreSQL',
       'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam. Comparaison NoSQL et SQL.',
       '2024-03-20 13:50:00',
       (SELECT id FROM topics WHERE title = 'Base de données'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com');

INSERT INTO posts (title, description, createdAt, topic_id, user_id) 
SELECT 'Optimisation des requêtes SQL',
       'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit. Performance et indexation.',
       '2024-02-05 12:35:00',
       (SELECT id FROM topics WHERE title = 'Base de données'),
       (SELECT id FROM _user WHERE email = 'admin@admin.com'); 