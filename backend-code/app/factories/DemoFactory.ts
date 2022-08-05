import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { Demo, IDemo } from '@/models/Demo';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class DemoFactory extends BaseFactory {
    static checkKeysInModel(keys: string | string[]): { result: boolean; message?: string } {
        return super._checkKeysInModel(keys, Demo);
    }

    static generateDemo(data: any): IDemo {
        if (this.checkValidBuildData(data)) {
            return new Demo(data);
        } else {
            throw new InvalidBuildDataError('Demo');
        }
    }

    static checkValidBuildData(data: ILooseObject): boolean {
        return !!data && data.name && data.description && data.field1 && data.field2;
    }
}
