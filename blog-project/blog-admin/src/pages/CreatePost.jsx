import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/api/posts", { title, content });
      setMessage("Post created!");
      setIsError(false);
      setTitle("");
      setContent("");
    } catch {
      setMessage("Failed to create post.");
      setIsError(true);
    }
  };

  return (
    <div className="create-post-page">
      <div className="create-post">
        <div className="create-post-header">
          <button className="btn-back" onClick={() => navigate("/")}>
            ← Back
          </button>
          <h2>New Post</h2>
        </div>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <input
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Write your content here…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="form-actions">
            <button className="btn-submit" type="submit">
              Publish Post
            </button>
            {message && (
              <p className={`form-message ${isError ? "error" : "success"}`}>
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
