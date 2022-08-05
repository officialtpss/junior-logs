import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { Demo, IDemo } from '@models/Demo';
import { ObjectId, QueryOptions, UpdateQuery } from 'mongoose';

export default class DemoService {
    static async create(resource: IDemo): Promise<IDemo> {
        return await resource.save();
    }

    static async list(findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IDemo[]> {
        const cursor = Demo.find({}, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }

    static async readById(id: string): Promise<IDemo | null> {
        return Demo.findById(id).select('-__v');
    }

    static async updateById(administratorId: string, administratorFields: UpdateQuery<IDemo>): Promise<IDemo> {
        const existingDemo = await Demo.findByIdAndUpdate(administratorId, administratorFields, { new: true });
        return existingDemo;
    }

    static async deleteById(id: string | ObjectId): Promise<IDemo | null> {
        return Demo.findByIdAndRemove(id);
    }
}
