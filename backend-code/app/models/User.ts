import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
    firstName: string;
    lastName: string;
    role: string;
    address: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    firstName: {
        type: String, required: true, trim: true
    },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: '' },
    password: { type: String, trim: true },
    role: { type: String, default: 'developer' },
    email: {
        type: String, required: true, unique: true,
        lowercase: true, trim: true
    },
    agreements: { type: Boolean, default: true },
    created: { type: Date, default: Date.now }
});

const User = model<IUser>('User', userSchema, 'users');

export { User, IUser };
