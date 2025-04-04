/**
 * Classe utilitaire pour le formatage des dates.
 * Fournit des méthodes statiques pour formater les dates selon différents formats.
 */
export class DateTimeFormatter {
  private static readonly DATE_FORMAT = {
    SEPARATOR: '/',
    TIME_SEPARATOR: ' ',
    TIME: ':'
  } as const;

  /**
   * Formate une date au format long (DD/MM/YYYY HH:mm)
   * 
   * @param date La date à formater
   * @returns La date formatée en chaîne de caractères
   */
  public static readonly formatLong = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}${DateTimeFormatter.DATE_FORMAT.SEPARATOR}${month}${DateTimeFormatter.DATE_FORMAT.SEPARATOR}${year}${DateTimeFormatter.DATE_FORMAT.TIME_SEPARATOR}${hours}${DateTimeFormatter.DATE_FORMAT.TIME}${minutes}`;
  }

  /**
   * Formate une date au format court (DD/MM/YYYY)
   * 
   * @param date La date à formater
   * @returns La date formatée en chaîne de caractères
   */
  public static readonly formatShort = (date: Date): string => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}${DateTimeFormatter.DATE_FORMAT.SEPARATOR}${month}${DateTimeFormatter.DATE_FORMAT.SEPARATOR}${year}`;
  }
}
