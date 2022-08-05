import { IUserFavLocation, UserFavLocations } from '@/models/UserFavLocation';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class UserFavLocationFactory extends BaseFactory {
    public static checkKeysInModel(keys: string | string[]) {
        return super._checkKeysInModel(keys, UserFavLocations);
    }

    static generateFavLocation(data: any): IUserFavLocation {
        try {
            return new UserFavLocations(data);
        } catch (err) {
            throw new InvalidBuildDataError('User');
        }
    }

}
