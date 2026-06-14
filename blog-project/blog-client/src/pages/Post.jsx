import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/Post.css";

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
      setPost((prev) => ({
        ...prev,
        comments: [...(prev.comments ?? []), res.data],
      }));
      setComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add comment");
    } finally {
      setLoadingComment(false);
    }
  };

  if (error)
    return (
      <div className="post-page">
        <p className="post-error">{error}</p>
      </div>
    );

  if (!post)
    return (
      <div className="post-page">
        <p className="post-loading">Loading post…</p>
      </div>
    );

  const comments = post.comments ?? [];

  return (
    <div className="post-page">
      <Link to="/" className="post-back">
        ← Back to posts
      </Link>

      <article className="post-article">
        <h1 className="post-title">{post.title}</h1>
        {post.author && <p className="post-meta">By {post.author.username}</p>}
        <p className="post-content">{post.content}</p>
      </article>

      <section className="comments-section">
        <h2 className="comments-heading">
          {comments.length > 0
            ? `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`
            : "Comments"}
        </h2>

        {comments.length === 0 && (
          <p className="no-comments">No comments yet. Be the first!</p>
        )}

        <div className="comment-list">
          {comments.map((c) => (
            <div key={c.id} className="comment-item">
              <span className="comment-author">
                {c.author?.username ?? "Anonymous"}
              </span>
              <p className="comment-content">{c.content}</p>
            </div>
          ))}
        </div>

        {user ? (
          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Share your thoughts…"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              className="comment-textarea"
            />
            <button
              type="submit"
              className="comment-submit"
              disabled={loadingComment}
            >
              {loadingComment ? "Posting…" : "Post comment"}
            </button>
          </form>
        ) : (
          <p className="login-prompt">
            <Link to="/login">Sign in</Link> to leave a comment
          </p>
        )}
      </section>
    </div>
  );
}

export default Post;
