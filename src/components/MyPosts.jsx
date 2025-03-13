import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MyPosts() {
  const author = localStorage.getItem('email');
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    try {
      const response = await axios.get('http://localhost:8080/userpost', {author});

      if (response.status === 200) {
        setPosts(response.data);
      } else if (response.status === 404) {
        console.log('No posts found');
      } else {
        console.log('An error occurred');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Myposts">Myposts</Link>
          </li>
        </ul>
      </nav>

      <br />
      <div>
        {posts.map((post) => (
          <div key={post._id} style={{ border: 'solid black 2px', textAlign: 'center' }}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button>delete</button>
            <button>edit</button>
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPosts;