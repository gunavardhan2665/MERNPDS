const mongoose = require('mongoose');

const postmodel = mongoose.Schema({
    title: String,
    content: String,
    author: String
})

const Post = mongoose.model('postmodel',postmodel);

module.exports = Post;