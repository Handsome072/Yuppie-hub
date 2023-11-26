"use client";

import { useDispatch, useSelector } from "react-redux";
import { addPost, deletePost } from "@/redux/slices/userSlice";
import { useState } from "react";

export default function TestReducer() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.user);
  console.log(posts);
  const handleDelete = async (postId) => {
    dispatch(deletePost(postId));
  };
  const handleSubmit = async () => {
    if (!title || !desc) return;
    const newPost = {
      id: Date.now(),
      title,
      desc,
    };
    dispatch(addPost(newPost));

    setTitle("");
    setDesc("");
  };
  return (
    <div>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          placeholder="title"
          value={title}
        />
        <br />
        <label htmlFor="desc">Desc</label>
        <textarea
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          id="desc"
          placeholder="description..."
          className="scr"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <br />
      {posts &&
        posts.map((p) => (
          <div key={p.id}>
            <span>{p.title}</span>
            <br />
            {p.desc}
            <br />
            <span onClick={() => handleDelete(p.id)}>delete</span>
          </div>
        ))}
    </div>
  );
}
