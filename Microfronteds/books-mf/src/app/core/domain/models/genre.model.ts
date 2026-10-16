/**
 * Enumeración que define los géneros literarios soportados en el sistema.
 *
 * @remarks
 * Sus valores coinciden con la representación serializada por el microservicio
 * `books-service` mediante `@JsonValue`.
 */
export enum Genre {
  /** Género de ficción narrativa general. */
  FICTION = 'Fiction',

  /** Género de no ficción, hechos reales y ensayos. */
  NON_FICTION = 'Non-Fiction',

  /** Género de misterio, suspenso y crimen. */
  MYSTERY = 'Mystery',

  /** Género de romance y relaciones amorosas. */
  ROMANCE = 'Romance',

  /** Género de ciencia ficción, tecnología y futuros especulativos. */
  SCIENCE_FICTION = 'Science Fiction',

  /** Género de fantasía, mundos mágicos y mitología. */
  FANTASY = 'Fantasy',

  /** Género de biografía y memorias de personajes. */
  BIOGRAPHY = 'Biography',

  /** Género de historia y acontecimientos del pasado. */
  HISTORY = 'History',

  /** Género de autoayuda, superación personal y bienestar. */
  SELF_HELP = 'Self-Help',

  /** Género de literatura infantil y juvenil. */
  CHILDREN = 'Children',
}

