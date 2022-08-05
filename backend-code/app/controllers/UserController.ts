import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import UserFactory from '@/factories/UserFactory';
import { IUser } from '@/models/User';
import CryptoSecurityService from '@/services/CryptoSecurityService';
import UserService from '@/services/UserService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class UserController {
    static async checkEmailExistOrNot(req: Request, res: Response, next: NextFunction) {
        const exist = await UserService.findOne({ email: req.body.email });
        if (exist) return sendResponse(res, undefined, `${req.body.email} already exist`, RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        next();
    }

    static async login(req: Request, res: Response | any, next: NextFunction) {
        try {
            req.body.password = await CryptoSecurityService.decrypt(req.body.password);
            const userData: IUser | any = await UserService.findOne(req.body, { password: 0 });
            if (!userData) return sendResponse(res, undefined, locale('INVALID_CREDENTIAL'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            res.user = userData;
            next();
        } catch (error) {
            logger.error('UserController.login() Error: ', error);
            return sendResponse(res, error?.message, locale('INVALID_CREDENTIAL'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST)
        }
    }

    static async create(req: Request, res: Response) {
        try {
            req.body.password = CryptoSecurityService.decrypt(req.body.password);
            req.body.created = new Date();
            const userData: IUser = UserFactory.generateUser(req.body);
            await UserService.create(userData);
            return sendResponse(res, undefined, locale('USER_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
        } catch (error) {
            logger.error('UserController.create() Error: ', error);
            return sendResponse(res, undefined, locale('USER_CREATE_FAILED'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST)
        }
    }

    static getAll = async (req: Request, res: Response | any, next: NextFunction) => {
        try {
            const users = await UserService.list({ _id: { $ne: res.userId } }, { password: 0 });
            return sendResponse(res, users, locale('USER_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.getAll() Error: ', error);
            next(error);
        }
    };

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.userId)) return sendResponse(res, {}, locale('USER_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const userId: string = req.params.userId;
            const findOneuserData = await UserService.readById(userId);
            return sendResponse(res, findOneuserData, locale('USER_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.userId)) return sendResponse(res, {}, locale('USER_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('USER_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const userId: string = req.params.userId;
            const userData = req.body;
            const updateuserData = await UserService.updateById(userId, { $set: userData });

            return sendResponse(res, updateuserData, locale('USER_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.update() Error: ', error);
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.userId)) return sendResponse(res, {}, locale('USER_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const userId: string = req.params.userId;
            await UserService.deleteById(userId);

            return sendResponse(res, null, locale('USER_DELETE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.delete() Error: ', error);
            next(error);
        }
    };
}

export default UserController;
