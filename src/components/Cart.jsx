
function Cart({
  cartItems,
  onIncrease,
  onDecrease,
  onRemove,
  onConfirm,
}) {
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart ({cartCount})</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your added items will appear here.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    <strong>{item.quantity}x</strong>
                    {"  "}
                    ${item.price.toFixed(2)}
                    {"  "}
                    <span>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className="cart-actions">
                  <button onClick={() => onDecrease(item.name)}>
                    -
                  </button>
                  <button onClick={() => onIncrease(item.name)}>
                    +
                  </button>
                  <button onClick={() => onRemove(item.name)}>
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <span>Order Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>

          <button className="confirm-order" onClick={onConfirm}>
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
