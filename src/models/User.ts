import {Schema, model} from 'mongoose';

let UserSchema: Schema = new Schema({

    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        default: '',
        required: true
    },
    username: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    email: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }]

});

export default model('User', UserSchema);
