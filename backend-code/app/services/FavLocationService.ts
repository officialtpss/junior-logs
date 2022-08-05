import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IUserFavLocation, UserFavLocations } from '@/models/UserFavLocation';
import { FilterQuery, QueryOptions } from 'mongoose';

export default class FavLocationService {
    static async create(resource: IUserFavLocation): Promise<any> {
        return await resource.save();
    }

    static async list(query: FilterQuery<IUserFavLocation>, findOptions: QueryOptions = {},
        sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IUserFavLocation[]> {
        const cursor = UserFavLocations.find(query, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }
}
