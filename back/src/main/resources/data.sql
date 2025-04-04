-- Ajout du rôle par défaut
INSERT INTO Role (name, createdAt) VALUES ('USER', CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE name = 'USER';

-- Ajout des thèmes par défaut
INSERT INTO topics (title, description, createdAt) VALUES 
('Développement Web', 'Discussions autour du développement web frontend et backend', CURRENT_TIMESTAMP),
('DevOps', 'Pratiques DevOps, CI/CD, et déploiement', CURRENT_TIMESTAMP),
('Intelligence Artificielle', 'IA, Machine Learning et Data Science', CURRENT_TIMESTAMP),
('Cybersécurité', 'Sécurité informatique et bonnes pratiques', CURRENT_TIMESTAMP),
('Mobile', 'Développement d''applications mobiles iOS et Android', CURRENT_TIMESTAMP),
('Architecture', 'Architecture logicielle et patterns de conception', CURRENT_TIMESTAMP),
('Cloud Computing', 'Services cloud, AWS, Azure, GCP', CURRENT_TIMESTAMP),
('Base de données', 'SQL, NoSQL et gestion des données', CURRENT_TIMESTAMP)
ON DUPLICATE KEY UPDATE title = VALUES(title), description = VALUES(description); 