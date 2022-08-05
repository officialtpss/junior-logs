import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import DemoFactory from '@/factories/DemoFactory';
import DemoService from '@/services/DemoService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class DemoController {
    static async create(req: Request, res: Response) {
        if (isEmpty(req.body)) return sendResponse(res, {}, locale('DEMO_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        const demoData = DemoFactory.generateDemo(req.body);
        const demo = await DemoService.create(demoData);

        return sendResponse(res, demo, locale('DEMO_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
    }

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const demos = await DemoService.list();
            return sendResponse(res, demos, locale('DEMO_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('DemoController.getAll() Error: ', error);
            next(error);
        }
    };

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.demoId)) return sendResponse(res, {}, locale('DEMO_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const demoId: string = req.params.demoId;
            const findOneDemoData = await DemoService.readById(demoId);
            return sendResponse(res, findOneDemoData, locale('DEMO_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('DemoController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.demoId)) return sendResponse(res, {}, locale('DEMO_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('DEMO_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const demoId: string = req.params.demoId;
            const demoData = req.body;
            const updateDemoData = await DemoService.updateById(demoId, { $set: demoData });

            return sendResponse(res, updateDemoData, locale('DEMO_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('DemoController.update() Error: ', error);
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.demoId)) return sendResponse(res, {}, locale('DEMO_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const demoId: string = req.params.demoId;
            await DemoService.deleteById(demoId);

            return sendResponse(res, null, locale('DEMO_DELETE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('DemoController.delete() Error: ', error);
            next(error);
        }
    };
}

export default DemoController;
