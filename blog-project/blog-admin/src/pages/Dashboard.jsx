import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Dashboard.css";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);
  const navigate = useNavigate();

  const togglePublish = async (id) => {
    if (processingId) return;
    setProcessingId(id);
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
    );
    try {
      await API.patch(`/api/posts/${id}/publish`);
    } catch {
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
      );
      setError("Failed to update post.");
    } finally {
      setProcessingId(null);
    }
  };

  const deletePost = async (id) => {
    if (processingId) return;
    if (!window.confirm("Delete this post?")) return;
    setProcessingId(id);
    try {
      await API.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch {
      setError("Failed to delete post.");
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await API.get("/api/posts/all");
        const data = res.data;
        setPosts(Array.isArray(data) ? data : (data.posts ?? data.data ?? []));
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.length - published;

  if (loading)
    return (
      <div className="dashboard-page">
        <p className="dashboard-loading">Loading…</p>
      </div>
    );
  if (error)
    return (
      <div className="dashboard-page">
        <p className="dashboard-error">{error}</p>
      </div>
    );

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Admin Dashboard</h2>
          <button className="btn btn-new" onClick={() => navigate("/create")}>
            + New Post
          </button>
        </div>
        <p className="dashboard-subtitle">Manage your blog posts</p>

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-label">Total</div>
            <div className="stat-value">{posts.length}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Published</div>
            <div className="stat-value">{published}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Drafts</div>
            <div className="stat-value">{drafts}</div>
          </div>
        </div>

        {posts.length === 0 ? (
          <p className="dashboard-empty">
            No posts yet. Create your first one!
          </p>
        ) : (
          <div className="post-list">
            {posts.map((post) => {
              const isProcessing = processingId === post.id;
              return (
                <div key={post.id} className="post-row">
                  <div className="post-row-info">
                    <h3>{post.title}</h3>
                    <span
                      className={`post-status ${post.published ? "published" : "draft"}`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="post-row-actions">
                    <button
                      className="btn btn-toggle"
                      onClick={() => togglePublish(post.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing
                        ? "Updating…"
                        : post.published
                          ? "Unpublish"
                          : "Publish"}
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => deletePost(post.id)}
                      disabled={isProcessing}
                    >
                      {isProcessing ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
