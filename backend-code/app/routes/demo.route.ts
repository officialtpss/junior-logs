import DemoController from '@/controllers/DemoController';
import UserAuthenticator from '@common/middlewares/UserAuthenticator';
import { Router } from 'express';

const path = '/demo';
const DemoRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /demo:
 *   get:
 *     tags: [demo]
 *     summary: Get Demo.
 *     description: Get all demos.
 *     operationId: getAll
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 25
 *         description: Numbers of records from server.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 2
 *           minimum: 1
 *         description: Page number of pagination request.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/Demo'
 *                 message:
 *                    type: string
 *                    example: Demo(s) retrieved successfully
 *                 success:
 *                    type: boolean
 *                    example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
DemoRouter.get(`${path}`, UserAuthenticator.isAdminAuthenticated(), DemoController.getAll);
/**
 * @openapi
 * /demo/{demoId}:
 *   get:
 *     tags: [demo]
 *     summary: Get Demo.
 *     description: Get specific demo.
 *     operationId: getOne
 *     parameters:
 *       - in: path
 *         name: demoId
 *         schema:
 *           type: string
 *           example: 577417e645d1b2640cd1f6e6
 *         required: true
 *         description: Id of demo to get.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/Demo'
 *                  message:
 *                      type: string
 *                      example: Demo retrieved successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
DemoRouter.get(`${path}/:demoId`, UserAuthenticator.isAdminAuthenticated(), DemoController.getOne);
/**
 * @openapi
 * /demo/{demoId}:
 *   patch:
 *     tags: [demo]
 *     summary: Edit Demo.
 *     description: Edit specific demo.
 *     operationId: update
 *     parameters:
 *       - in: path
 *         name: demoId
 *         schema:
 *           type: string
 *           example: 577417e645d1b2640cd1f6e6
 *         required: true
 *         description: Id of demo to update
 *     requestBody:
 *       description: Available properties to update
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Demo'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/Demo'
 *                 message:
 *                     type: string
 *                     example: Demo updated successfully
 *                 success:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
DemoRouter.patch(`${path}/:demoId`, UserAuthenticator.isAdminAuthenticated(), DemoController.update);
/**
 * @openapi
 * /demo/{demoId}:
 *   delete:
 *     tags: [demo]
 *     summary: Delete Demo.
 *     description:  Delete specific demo.
 *     operationId: delete
 *     parameters:
 *       - in: path
 *         name: demoId
 *         schema:
 *           type: string
 *           example: 577417e645d1b2640cd1f6e6
 *         required: true
 *         description: Id of demo to delete
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      example: null
 *                  message:
 *                      type: string
 *                      example: Demo deleted successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server was not able to handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       409:
 *         description: Found active demo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400'
 *     security: [jwt_api_auth: []]
 */
DemoRouter.delete('/:demoId', UserAuthenticator.isAdminAuthenticated(), DemoController.delete);
/**
 * @openapi
 * /demo:
 *   post:
 *     tags: [demo]
 *     summary: Create Demo.
 *     description: Create demo.
 *     operationId: create
 *     requestBody:
 *       description: create demo
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Demo'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/Demo'
 *                  message:
 *                      type: string
 *                      example: Demo created successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
DemoRouter.post(`${path}`, UserAuthenticator.isAdminAuthenticated(), DemoController.create);

export default DemoRouter;
