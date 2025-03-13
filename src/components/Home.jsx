import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import axios from 'axios'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getPosts')
                if (response.status === 200) {
                    setPosts(response.data)
                } else {
                    console.log("Failed to fetch posts")
                }
            } catch (error) {
                console.error("Error fetching posts:", error)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/Home">Home</Link></li>
                    <li><Link to="/Myposts">Myposts</Link></li>
                </ul>
            </nav>
            <br/>
            <div >
                {posts.map(post => (
                    <div key={post._id} style={{"border":"solid black 2px","textAlign":"center"}}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <br/>
                        <br/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home