import { Document, model, Schema } from 'mongoose';

interface IDemo extends Document {
    name: string;
    description: string;
    field1: string;
    field2: string;
    // Add more fields
}

const demoSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    field1: { type: String, required: true },
    field2: { type: String, required: true },
    // Add more fields
});

const Demo = model<IDemo>('Demo', demoSchema, 'demo');

export { Demo, IDemo };
