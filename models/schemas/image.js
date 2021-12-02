const { Schema } = require('mongoose');

const imageSchema = Schema(
    {
        imageURL: {
            type: String,
            required: [true, 'Image URL is required']
        },
        imageHostingId: {
            type: String,
        },
        smallImageURL: {
            type: String,
        },
        imageInfo: {
            tags: {
                type: [String],
                default: [],
            },
            likes: {
                type: [String],
                default: [],
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
        },
        openedTo: {
            type: [String],
            default: [],
        }
    },
    { versionKey: false, timeStamps: true },
);

module.exports = imageSchema;