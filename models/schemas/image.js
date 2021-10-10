const { Schema } = require('mongoose');

const imageSchema = Schema(
    {
        imageURL: {
            type: String,
            required: [true, 'Image URL is required']
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
            default: true,
        },
        belongsTo: {
            type: String,
            default: '',
            required: Boolean,
        }
    },
    { versionKey: false, timeStamps: true },
);

module.exports = imageSchema;