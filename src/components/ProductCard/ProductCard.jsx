import React from "react";
import "./ProductCard.css";

const ProductCard = ({ productName, unitPrice, nameImage, featured, originalPrice }) => {
  const onSale = originalPrice != null && originalPrice > unitPrice;
  const discountPct = onSale
    ? Math.round((1 - unitPrice / originalPrice) * 100)
    : null;

  return (
    <div className={`card${featured ? " featured" : ""}`}>
      <div className="imgBox">
        <img src={nameImage} alt={productName} className="mouse" />
        {featured && <span className="badge">Destacado</span>}
        {onSale && <span className="badge badge-sale">-{discountPct}%</span>}
      </div>

      <div className="contentBox">
        <h3>{productName}</h3>
        <h2 className="price">
          {unitPrice} <small>USD</small>
          {onSale && <s className="price-original">{originalPrice}</s>}
        </h2>
        {/* No real cart/checkout flow yet — a real, non-navigating button
            instead of a dead "#" link. */}
        <button type="button" className="buy">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
