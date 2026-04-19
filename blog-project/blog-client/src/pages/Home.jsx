import { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import React from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/api/posts");
        setPosts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p style={{ padding: "2rem" }}>Loading posts...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Published Posts</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <h3>{post.title}</h3>
            <p>
              {post.content
                ? post.content.slice(0, 120) + "..."
                : "No content available"}
            </p>
            <Link to={`/post/${post.id}`}>Read More</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
