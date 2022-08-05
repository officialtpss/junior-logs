import { Document, model, Schema } from 'mongoose';

interface IUserFavLocation extends Document {
    userId: string;
    location: any;
    title: string;
    draggable: boolean;
}

const favLocationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    title: { type: String, trim: true, required: true },
    draggable: { type: Boolean, default: false },
    created: { type: Date, default: Date.now }
});
favLocationSchema.index({ location: "2dsphere" });
const UserFavLocations = model<IUserFavLocation>('FavLocation', favLocationSchema, 'favLocations');


export { UserFavLocations, IUserFavLocation };
