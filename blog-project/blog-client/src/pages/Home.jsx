import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/api/posts");
        const data = res.data;
        setPosts(Array.isArray(data) ? data : (data.posts ?? data.data ?? []));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="loading-state">Loading posts…</p>;

  return (
    <div className="home">
      <div className="home-header">
        <h2>Latest Posts</h2>
        <p>Thoughts, ideas, and stories.</p>
      </div>

      {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}

      {posts.length === 0 ? (
        <div className="empty-state">
          <p>No posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className="post-list">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>
                {post.content
                  ? post.content.slice(0, 140) + "…"
                  : "No content available"}
              </p>
              <Link to={`/post/${post.id}`}>Read more →</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
