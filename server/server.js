const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Post = require('./postmodel')


const User = require('./usermodel');

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb://localhost:27017/feedapp').then((res) => {
    console.log("DB connected successfully");
})
.catch((err) => { console.log(err) });

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        } else {
            return res.status(200).json({ user });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/getposts', async (req, res) => {
    try{
        const posts = await Post.find({});
        res.status(200).json(posts);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
    })
app.post('/addpost',async(req,res)=>{
    const { title, body, userId } = req.body;
    const post = Post(title,body,userId)
    new post.save()
    res.status(201).json(post);
})

app.put('/updatepost/:id', async (req, res) => {
    const { title, body } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, body }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get('/userpost',async (req, res) => {
    const { author } = req.body;
    try{
        const posts = await Post.find({ author });
        
        if(posts){
            res.status(200).json(posts);
        }else{
            res.status(404).json({ error: "No posts found for this user" });
        }
    }catch{
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
    }
    })

app.listen(8080, () => {
    try {
        console.log("Server running on port 8080");
    } catch (err) {
        console.log(err);
    }
});