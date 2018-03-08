import {Schema, model} from 'mongoose';

let ArticleSchema: Schema = new Schema({

    createdAt: Date,
    updatedAt: Date,
    title: {
        type: String,
        default: '',
        required: true
    },
    slug: {
        type: String,
        default: '',
        required: true,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        default: '',
        required: true
    },
    featuredImage: {
        type: String,
        default: ''
    }

});

export default model('Article', ArticleSchema);
