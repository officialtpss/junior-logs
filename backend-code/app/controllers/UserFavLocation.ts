import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import UserFavLocationFactory from '@/factories/UserFavLocationFactory';
import { IUserFavLocation } from '@/models/UserFavLocation';
import FavLocationService from '@/services/FavLocationService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

class UserFavLocation {

    static async create(req: Request, res: Response | any) {
        try {
            req.body.created = new Date();
            req.body.userId = res.userId;
            const userData: IUserFavLocation = UserFavLocationFactory.generateFavLocation(req.body);
            await FavLocationService.create(userData);
            return sendResponse(res, undefined, locale('ADDED_LOCATION_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
        } catch (error) {
            return sendResponse(res, undefined, locale('LOCATION_CREATE_FAILED'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST)
        }
    }

    static getAll = async (req: Request, res: Response | any, next: NextFunction) => {
        try {
            const userFavLocations = await FavLocationService.list({ userId: { $eq: res.userId } });
            return sendResponse(res, userFavLocations, locale('GET_USER_LOCATION_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserFavLocation.getAll() Error: ', error);
            next(error);
        }
    };



}

export default UserFavLocation;
