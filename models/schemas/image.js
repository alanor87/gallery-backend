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
        }
    }
);

module.exports = imageSchema;