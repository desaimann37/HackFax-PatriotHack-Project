import React, { useState } from "react";
import { FiUpload, FiSend } from "react-icons/fi";

function ImageUploader({ onUpload }) {
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (image) {
      onUpload(image);
      setImage(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        padding: "15px",
        borderTop: "1px solid #eee",
        background: "#f5f5f7"
      }}
    >
      {/* File Input */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          background: "#fff",
          cursor: "pointer",
          transition: "all 0.2s ease"
        }}
      >
        <FiUpload />
        <span>Select</span>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          style={{ display: "none" }}
        />
      </label>

      {/* Send Button */}
      <button
        onClick={handleSubmit}
        disabled={!image}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: image ? "#111" : "#ccc",
          color: "#fff",
          cursor: image ? "pointer" : "not-allowed",
          transition: "all 0.2s ease"
        }}
      >
        <FiSend />
        Send
      </button>
    </div>
  );
}

export default ImageUploader;
