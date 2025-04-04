export const VALIDATION_PATTERNS = {
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  EMAIL: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
  NAME: /^[a-zA-ZÀ-ÿ\s-]{2,50}$/,
  TITLE: /^[a-zA-ZÀ-ÿ0-9\s-]{2,100}$/,
  CONTENT: /^[\s\S]{10,2000}$/
} as const; 