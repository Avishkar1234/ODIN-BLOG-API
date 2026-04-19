import { useState } from "react";
import API from "../api/axios";
import "./CreatePost.css";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/api/posts", { title, content });
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
    } catch {
      setMessage("Failed to create post.");
    }
  };

  return (
    <div className="create-post">
      <h2>Create Post</h2>

      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button className="btn-submit" type="submit">
          Create
        </button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default CreatePost;
