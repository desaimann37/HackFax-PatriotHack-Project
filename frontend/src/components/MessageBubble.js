import React, { useRef, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ImageWithBoxes from "./ImageWithBoxes";
import ReactMarkdown from "react-markdown";

function MessageBubble({ message }) {
  const isUser = message.role === "user";
  const bubbleRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      style={{
        marginBottom: "18px",
        textAlign: isUser ? "right" : "left",
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: "10px",
        transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
      }}
      ref={bubbleRef}
    >
      <div
        style={{
          display: "inline-block",
          padding: "14px 18px",
          borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
          background: isUser ? "linear-gradient(135deg,#4f8cff 60%,#a0c4ff 100%)" : "#fff",
          color: isUser ? "#fff" : "#222",
          maxWidth: "70vw",
          minWidth: "60px",
          border: isUser ? "none" : "1px solid #e5eaf2",
          boxShadow: isUser ? "0 2px 8px rgba(79,140,255,0.08)" : "0 2px 8px rgba(0,0,0,0.04)",
          fontSize: "1.08rem",
          wordBreak: "break-word",
          transition: "all 0.3s cubic-bezier(.4,2,.6,1)",
          position: "relative",
        }}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" style={{ color: "#4f8cff" }} />
              )
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}

        {message.image && (
          <div style={{ marginTop: "14px", display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}>
            <div style={{
              background: "#f6fafd",
              borderRadius: "10px",
              boxShadow: "0 1px 4px rgba(79,140,255,0.07)",
              padding: "8px",
              display: "inline-block",
              maxWidth: "320px",
              animation: visible ? "popIn 0.5s cubic-bezier(.4,2,.6,1)" : "none"
            }}>
              <ImageWithBoxes
                imageBase64={message.image}
                detections={message.detections || []}
              />
            </div>
          </div>
        )}
      </div>

      {message.products &&
        message.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}

export default MessageBubble;
