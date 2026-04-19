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
    } catch (err) {
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
        setPosts(res.data);
      } catch {
        setError("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button className="btn-new" onClick={() => navigate("/create")}>
          + New Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="dashboard-empty">No posts found</p>
      ) : (
        posts.map((post) => {
          const isProcessing = processingId === post.id;

          return (
            <div key={post.id} className="post-row">
              <div className="post-row-info">
                <h3>{post.title}</h3>
                <span
                  className={`post-status ${
                    post.published ? "published" : "draft"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </span>
              </div>

              <div className="post-row-actions">
                <button
                  className="btn-toggle"
                  onClick={() => togglePublish(post.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Updating..." : "Toggle"}
                </button>

                <button
                  className="btn-delete"
                  onClick={() => deletePost(post.id)}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;
