export const ERROR_MESSAGES = {
  AUTH: {
    NAME_REQUIRED: 'Le nom est requis',
    EMAIL_INVALID: 'L\'email n\'est pas valide',
    PASSWORD_INVALID: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
    PASSWORD_REQUIRED: 'Le mot de passe est requis',
    LOGIN_ERROR: 'Identifiants incorrects',
    REGISTER_ERROR: 'Une erreur est survenue lors de l\'inscription'
  },
  POSTS: {
    TITLE_REQUIRED: 'Le titre est requis',
    CONTENT_REQUIRED: 'Le contenu est requis',
    CREATE_ERROR: 'Une erreur est survenue lors de la création du post',
    UPDATE_ERROR: 'Une erreur est survenue lors de la mise à jour du post',
    DELETE_ERROR: 'Une erreur est survenue lors de la suppression du post'
  },
  TOPICS: {
    NAME_REQUIRED: 'Le nom du sujet est requis',
    DESCRIPTION_REQUIRED: 'La description est requise',
    CREATE_ERROR: 'Une erreur est survenue lors de la création du sujet',
    SUBSCRIBE_ERROR: 'Une erreur est survenue lors de l\'abonnement au sujet'
  },
  COMMON: {
    NETWORK_ERROR: 'Une erreur réseau est survenue',
    UNEXPECTED_ERROR: 'Une erreur inattendue est survenue'
  }
} as const; 