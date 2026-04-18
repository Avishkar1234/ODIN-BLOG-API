import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Post() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Post not found");
      }
    };

    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    setLoadingComment(true);

    try {
      const res = await API.post(`/api/posts/${id}/comments`, {
        content: comment,
      });

      // Add new comment to UI instantly
      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }));

      setComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoadingComment(false);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <hr />

      <h3>Comments</h3>

      {post.comments.length === 0 && <p>No comments yet</p>}

      {post.comments.map((c) => (
        <div key={c.id} style={{ marginBottom: "1rem" }}>
          <strong>{c.author.username}</strong>
          <p>{c.content}</p>
        </div>
      ))}

      {user && (
        <form onSubmit={handleCommentSubmit} style={{ marginTop: "1rem" }}>
          <textarea
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
          />

          <button type="submit" disabled={loadingComment}>
            {loadingComment ? "Posting..." : "Add Comment"}
          </button>
        </form>
      )}

      {!user && <p>Login to add a comment</p>}
    </div>
  );
}

export default Post;
