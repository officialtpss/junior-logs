import UserRouter from '@/routes/user.route';
import { IRoutes } from '@common/interfaces/IRoutes';
import DemoRouter from '@routes/demo.route';
import { logger } from '@utils/logger';
import { Router } from 'express';
import UserFavLocationRouter from './user.fav-location.route';

export class IndexRoute implements IRoutes {
    public path = '/api';
    public router = Router({ mergeParams: true });
    public routerArray = [];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(this.path, DemoRouter);
        this.router.use(this.path, UserRouter);
        this.router.use(this.path, UserFavLocationRouter);
        logger.info('Routes initiated...');
    }
}
