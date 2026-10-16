import { Genre, Language } from '../../core/domain/models/book.model';

/**
 * Etiquetas en español para los géneros literarios.
 */
export const BOOK_GENRE_LABELS: Record<Genre, string> = {
  [Genre.FICTION]: 'Ficción',
  [Genre.NON_FICTION]: 'No Ficción',
  [Genre.MYSTERY]: 'Misterio',
  [Genre.ROMANCE]: 'Romance',
  [Genre.SCIENCE_FICTION]: 'Ciencia Ficción',
  [Genre.FANTASY]: 'Fantasía',
  [Genre.BIOGRAPHY]: 'Biografía',
  [Genre.HISTORY]: 'Historia',
  [Genre.SELF_HELP]: 'Autoayuda',
  [Genre.CHILDREN]: 'Infantil'
};

/**
 * Clases CSS para las insignias de género literario.
 */
export const BOOK_GENRE_CLASSES: Record<Genre, string> = {
  [Genre.FICTION]: 'genre-fiction',
  [Genre.NON_FICTION]: 'genre-non-fiction',
  [Genre.MYSTERY]: 'genre-mystery',
  [Genre.ROMANCE]: 'genre-romance',
  [Genre.SCIENCE_FICTION]: 'genre-science-fiction',
  [Genre.FANTASY]: 'genre-fantasy',
  [Genre.BIOGRAPHY]: 'genre-biography',
  [Genre.HISTORY]: 'genre-history',
  [Genre.SELF_HELP]: 'genre-self-help',
  [Genre.CHILDREN]: 'genre-children'
};

/**
 * Iconos representativos para cada género literario.
 */
export const BOOK_GENRE_ICONS: Record<Genre, string> = {
  [Genre.FICTION]: '📖',
  [Genre.NON_FICTION]: '📘',
  [Genre.MYSTERY]: '🕵️',
  [Genre.ROMANCE]: '💖',
  [Genre.SCIENCE_FICTION]: '🚀',
  [Genre.FANTASY]: '🪄',
  [Genre.BIOGRAPHY]: '👤',
  [Genre.HISTORY]: '🏛️',
  [Genre.SELF_HELP]: '🌱',
  [Genre.CHILDREN]: '🧸'
};

/**
 * Etiquetas en español para los idiomas de los libros.
 */
export const BOOK_LANGUAGE_LABELS: Record<Language, string> = {
  [Language.ENGLISH]: 'Inglés',
  [Language.SPANISH]: 'Español',
  [Language.FRENCH]: 'Francés',
  [Language.GERMAN]: 'Alemán',
  [Language.ITALIAN]: 'Italiano',
  [Language.PORTUGUESE]: 'Portugués',
  [Language.CHINESE]: 'Chino',
  [Language.JAPANESE]: 'Japonés',
  [Language.KOREAN]: 'Coreano',
  [Language.RUSSIAN]: 'Ruso'
};

/**
 * Opciones de género para selectores de filtrado en la interfaz.
 */
export const GENRE_OPTIONS: Array<{ value: Genre; label: string; icon: string }> = Object.values(Genre).map(
  genre => ({
    value: genre,
    label: BOOK_GENRE_LABELS[genre],
    icon: BOOK_GENRE_ICONS[genre]
  })
);

