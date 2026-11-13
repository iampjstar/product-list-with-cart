
function OrderConfirmation({
  cartItems,
  total,
  onStartNewOrder,
}) {
  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">
        <div className="confirmation-icon">✓</div>

        <h2>Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>

        <div className="confirmed-items">
          {cartItems.map((item) => (
            <div className="confirmed-item" key={item.name}>
              <span>{item.name}</span>
              <span>
                {item.quantity}x
              </span>
              <strong>
                ${(item.price * item.quantity).toFixed(2)}
              </strong>
            </div>
          ))}
        </div>

        <div className="confirmation-total">
          <span>Order Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <button onClick={onStartNewOrder}>
          Start New Order
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmation;
