/**
 * Configuración de variables de entorno de la aplicación.
 *
 * @remarks
 * Este archivo contiene las constantes de entorno utilizadas
 * en la aplicación Angular. Se reemplaza automáticamente
 * según el entorno (development, production, etc.) durante
 * el proceso de build.
 *
 * @example
 * ```ts
 * import { environment } from '@environments/environment';
 *
 * this.http.get(`${environment.baseUrl}/users`);
 * ```
 */
export const environment = {
  /**
   * URL base del backend en NodeJS de la aplicación.
   *
   * @remarks
   * Se utiliza como punto de partida para construir
   * las peticiones HTTP hacia la API.
   *
   */
  baseUrlNode: 'http://localhost:3000',
  /**
   * URL base del backend EN SpringBoot de la aplicación.
   *
   * @remarks
   * Se utiliza como punto de partida para construir
   * las peticiones HTTP hacia la API.
   *
   */
  baseUrlSpringBoot: 'http://localhost:8080',
};