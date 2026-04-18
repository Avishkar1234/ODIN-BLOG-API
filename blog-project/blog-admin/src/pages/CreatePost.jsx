import { useState } from "react";
import API from "../api/axios";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/api/posts", {
      title,
      content,
    });

    alert("Post created!");
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

        <textarea
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreatePost;
