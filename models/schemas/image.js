const { Schema } = require('mongoose');

const imageSchema = Schema(
    {
        imageURL: {
            type: String,
            required: [true, 'Image URL is required']
        },
        smallImageURL: {
            type: String,
            required: [true, 'Image thumb URL is required']
        },
        imageInfo: {
            tags: {
                type: [String],
                default: [],
            },
            likes: {
                type: Number,
                default: 0,
            },
        },
        isPublic: {
            type: Boolean,
            default: false,
        },
        belongsTo: {
            type: String,
            default: '',
            required: true,
        }
    },
    { versionKey: false, timeStamps: true },
);

module.exports = imageSchema;