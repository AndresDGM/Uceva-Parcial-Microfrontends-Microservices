/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastName
 *         - age
 *         - email
 *         - engineering
 *       properties:
 *         id:
 *           type: string
 *           example: "4"
 *         name:
 *           type: string
 *           example: "María"
 *         lastName:
 *           type: string
 *           example: "Gómez"
 *         age:
 *           type: integer
 *           example: 22
 *         email:
 *           type: string
 *           example: "maria@example.com"
 *         engineering:
 *           type: string
 *           example: "Ingeniería de Sistemas"
 */
export {};