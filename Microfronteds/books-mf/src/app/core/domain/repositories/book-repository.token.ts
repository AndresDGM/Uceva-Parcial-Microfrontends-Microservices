import { InjectionToken } from '@angular/core';
import { BookRepository } from './book.repository';

/**
 * Token de inyección de dependencias para el contrato `BookRepository`.
 *
 * @remarks
 * Permite inyectar la implementación concreta del repositorio de libros
 * sin acoplar los casos de uso a una clase de infraestructura específica.
 */
export const BOOK_REPOSITORY_TOKEN = new InjectionToken<BookRepository>('BookRepository');

