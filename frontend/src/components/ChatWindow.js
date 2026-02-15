import React from "react";

function ChatWindow({ messages }) {
  return (
    <div className="container py-4">

      {messages.length === 0 && (
        <div className="text-center text-muted">
          <h5>Upload an image to analyze clothing</h5>
        </div>
      )}

      {messages.map((msg, index) => (
        <div key={index} className="mb-4">
          <div className="card shadow-sm">
            <div className="card-body">

              {/* === Top Section: Image + Attributes === */}
              <div className="row align-items-start">

                {/* Left: Image */}
                {msg.image && (
                  <div className="col-md-5 text-center mb-3 mb-md-0">
                    <img
                      src={`data:image/jpeg;base64,${msg.image}`}
                      alt="Analyzed"
                      className="img-fluid rounded shadow"
                      style={{
                        maxWidth: "320px",
                        maxHeight: "420px",
                        objectFit: "contain"
                      }}
                    />
                  </div>
                )}

                {/* Right: Attributes + Explanation */}
                <div className="col-md-7">

                  {/* Detected Attributes */}
                  {(msg.gender || msg.color) && (
                    <div className="alert alert-info">
                      <strong>Detected Attributes</strong>
                      <hr />
                      <p className="mb-1">
                        <strong>Gender:</strong> {msg.gender || "unknown"}
                      </p>
                      <p className="mb-0">
                        <strong>Dress Color:</strong> {msg.color || "unknown"}
                      </p>
                    </div>
                  )}

                  {/* YOLO Detections */}
                  {msg.detections && msg.detections.length > 0 && (
                    <div className="mb-3">
                      <h6>Detected Clothing</h6>
                      <ul className="list-group">
                        {msg.detections.map((d, i) => (
                          <li
                            key={i}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            {d.class}
                            <span className="badge bg-primary">
                              {(d.confidence * 100).toFixed(1)}%
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Explanation */}
                  {msg.explanation && (
                    <div>
                      <h6>AI Explanation</h6>
                      <p className="mb-0">{msg.explanation}</p>
                    </div>
                  )}

                </div>
              </div>

              {/* === Product Recommendations === */}
              {msg.products && msg.products.length > 0 && (
                <div className="mt-4">
                  <h6>Recommended Products</h6>
                  <div className="row">
                    {msg.products.map((product, i) => (
                      <div key={i} className="col-md-4 mb-3">
                        <div className="card h-100 shadow-sm">
                          <img
                            src={`http://localhost:8000/products/${product.image}`}
                            className="card-img-top"
                            alt={product.name}
                            style={{ height: "200px", objectFit: "cover" }}
                          />
                          <div className="card-body">
                            <h6 className="card-title">
                              {product.name}
                            </h6>
                            <p className="card-text fw-bold">
                              ${product.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

export default ChatWindow;
