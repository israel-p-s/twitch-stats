const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
    id: String,
    user_id: String,
    user_login: String,
    user_name: String,
    game_id: String,
    game_name: String,
    type: String,
    title: String,
    viewer_count: Number,
    started_at: Date,
    language: String,
    thumbnail_url: String,
    tag_ids: [String],
    tags: [String],
    is_mature: Boolean,
    timestamp: Date
});

module.exports = mongoose.model('Stream', StreamSchema, 'streams');  