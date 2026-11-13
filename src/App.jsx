
import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import OrderConfirmation from "./components/OrderConfirmation";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems")) || [];
    } catch {
      return [];
    }
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load products");
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((previousItems) => {
      const existingItem = previousItems.find(
        (item) => item.name === product.name
      );

      if (existingItem) {
        return previousItems.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousItems, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (name) => {
    setCartItems((previousItems) =>
      previousItems.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCartItems((previousItems) =>
      previousItems
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (name) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.name !== name)
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const confirmOrder = () => {
    if (cartItems.length > 0) setShowConfirmation(true);
  };

  const startNewOrder = () => {
    setCartItems([]);
    setShowConfirmation(false);
  };

  return (
    <main className="app-container">
      <section className="products-section">
        <h1>Desserts</h1>

        <div className="products-grid">
          {products.map((product) => {
            const cartItem = cartItems.find(
              (item) => item.name === product.name
            );

            return (
              <ProductCard
                key={product.name}
                product={product}
                quantity={cartItem ? cartItem.quantity : 0}
                onAdd={() => addToCart(product)}
                onIncrease={() => increaseQuantity(product.name)}
                onDecrease={() => decreaseQuantity(product.name)}
              />
            );
          })}
        </div>
      </section>

      <Cart
        cartItems={cartItems}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onRemove={removeItem}
        onConfirm={confirmOrder}
      />

      {showConfirmation && (
        <OrderConfirmation
          cartItems={cartItems}
          total={cartTotal}
          onStartNewOrder={startNewOrder}
        />
      )}
    </main>
  );
}

export default App;
