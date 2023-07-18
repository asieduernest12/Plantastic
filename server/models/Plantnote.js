const { Schema, Types } = require("mongoose");

// create our PlantNote schema
const plantNoteSchema = new Schema({
    noteId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    note: {
        type: String,
        required: true,
        maxLength: 250
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp)
    },
});

function dateFormat(date) {
    return date.toLocaleDateString();
}

module.exports = plantNoteSchema;