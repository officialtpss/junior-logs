import JWTAuthenticator from '@/common/middlewares/jwt.validator';
import validator from '@/common/middlewares/schema.validator';
import UserFavLocation from '@/controllers/UserFavLocation';
import { Router } from 'express';
import Joi from 'joi';

const path = '/user-fav-location';
const UserFavLocationRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /user-fav-location:
 *   get:
 *     tags: [FavLocation]
 *     summary: Get all fav location.
 *     description: Get all fav location.
 *     operationId: getAll
 *     parameters:
 *       - name: Authorization
 *         description: Bearer token
 *         in: header
 *         required: true
 *         type: string
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
 *                      $ref: '#/components/schemas/FavLocation'
 *                 message:
 *                    type: string
 *                    example: location(s) retrieved successfully
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
UserFavLocationRouter.get(`${path}`, JWTAuthenticator.decode, UserFavLocation.getAll);

/**
 * @openapi
 * /user-fav-location:
 *   post:
 *     tags: [FavLocation]
 *     summary: Create Fav Location.
 *     description: Create Fav Location.
 *     operationId: create
 *     parameters:
 *       - name: Authorization
 *         description: Bearer token
 *         in: header
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Available properties to update
 *       required: true
 *       parameters:
 *        - name: Authorization
 *          description: Bearer token
 *          in: header
 *          required: true
 *          type: string
 *       content:
 *          application/json:
 *             schema:
 *              $ref: '#/components/schemas/FavLocation'
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
 *                   $ref: '#/components/schemas/200'
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
const userFavLocationSchema = {
    location: Joi.object().required(),
    title: Joi.string().required(),
};

UserFavLocationRouter.post(`${path}`, validator(userFavLocationSchema), JWTAuthenticator.decode, UserFavLocation.create);

export default UserFavLocationRouter;
