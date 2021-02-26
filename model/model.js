const mongoose = require('mongoose')
const schema = mongoose.Schema;

const postSchema = new schema({
    text: {
        type: String,
        require
    },
    publisher: String,
    date: String
})

module.exports = mongoose.model('Post',postSchema);