import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  const togglePublish = async (id) => {
    if (processingId) return;
    setProcessingId(id);

    // Optimistically update UI
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
    );

    try {
      await API.patch(`/api/posts/${id}/publish`);
    } catch (err) {
      console.error(err);
      // Roll back optimistic update on failure
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)),
      );
      setError("Failed to update post. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  const deletePost = async (id) => {
    if (processingId) return;
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setProcessingId(id);

    try {
      await API.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete post. Please try again.");
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await API.get("/api/posts/all");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
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
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>

      {posts.length === 0 ? (
        <p>No posts found</p>
      ) : (
        posts.map((post) => {
          const isProcessing = processingId === post.id;

          return (
            <div key={post.id} style={{ marginBottom: "1rem" }}>
              <h3>{post.title}</h3>
              <p>{post.published ? "Published" : "Draft"}</p>

              <button
                onClick={() => togglePublish(post.id)}
                disabled={isProcessing}
              >
                {isProcessing ? "Updating..." : "Toggle Publish"}
              </button>

              <button
                onClick={() => deletePost(post.id)}
                disabled={isProcessing}
              >
                {isProcessing ? "Deleting..." : "Delete"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Dashboard;
