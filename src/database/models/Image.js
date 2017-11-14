import mongoose from 'mongoose';

const Image = new mongoose.Schema({
    name:
    {
        type: String,
        unique: true,
        maxlength: 30
    },
    location:
    {
        type: String,
        unique: false,
        maxlength: 200
    }
});

export default mongoose.model('images', Image);
