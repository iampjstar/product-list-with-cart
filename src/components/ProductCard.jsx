
function ProductCard({ product, quantity, onAdd, onIncrease, onDecrease }) {
  const imagePath = product.image.desktop;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={imagePath}
          alt={product.name}
          className="product-image"
        />

        {quantity === 0 ? (
          <button
            className="add-to-cart-btn"
            onClick={onAdd}
          >
            <span>🛒</span> Add to Cart
          </button>
        ) : (
          <div className="quantity-control">
            <button onClick={onDecrease}>−</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
          </div>
        )}
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="product-price">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
