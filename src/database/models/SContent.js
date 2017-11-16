import mongoose from 'mongoose';

const SContent = new mongoose.Schema({
    type:
    {
        type: String,
        unique: true,
        maxlength: 100
    },
    title: String,
    body: String,
    content:
    [
        {
            title: String,
            body: String,
            icon: String,
            description: String,
            url: String
        }
    ],
    snippets: [ String ],
    copyright: String,
    buttons:
    [
        {
            type:
            {
                type: String
            },
            url: String
        }
    ],
    query: String
}, { strict: false });

export default mongoose.model('contents', SContent);
