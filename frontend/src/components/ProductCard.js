import React from "react";

function ProductCard({ product }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "150px", borderRadius: "8px" }}
      />
      <p>{product.title}</p>
      <p>{product.price}</p>
    </div>
  );
}

export default ProductCard;
