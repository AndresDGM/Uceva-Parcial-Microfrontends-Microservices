/**
 * Enumeración que define los idiomas disponibles para los libros en el sistema.
 *
 * @remarks
 * Sus valores coinciden con la representación serializada por el microservicio
 * `books-service` mediante `@JsonValue`.
 */
export enum Language {
  /** Idioma inglés. */
  ENGLISH = 'English',

  /** Idioma español. */
  SPANISH = 'Spanish',

  /** Idioma francés. */
  FRENCH = 'French',

  /** Idioma alemán. */
  GERMAN = 'German',

  /** Idioma italiano. */
  ITALIAN = 'Italian',

  /** Idioma portugués. */
  PORTUGUESE = 'Portuguese',

  /** Idioma chino. */
  CHINESE = 'Chinese',

  /** Idioma japonés. */
  JAPANESE = 'Japanese',

  /** Idioma coreano. */
  KOREAN = 'Korean',

  /** Idioma ruso. */
  RUSSIAN = 'Russian',
}

