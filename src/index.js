import React, { useState } from "react"; // Correct import statement
import ReactDOM from "react-dom/client";
import "./index.css";

//1 inline style
// obj in js
// const obj = { color: "red", fontSize: "20px" }; //{key: value}
// function App() {
//   return <h1 style={{ color: "blue", fontSize: "70px" }}>Hello</h1>;
// }

//2 External CSS file
function Pizza({ name, ingredients, price, photoName, soldOut, onSelect }) {
  return (
    <div className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <h3>{name}</h3>
      <p>{ingredients}</p>
      {/* // asks is it is sold out if yes then sold out if no then show price */}
      <p>{soldOut ? "Sold Out" : `$${price}`}</p>
      {!soldOut && <button onClick={() => onSelect(name)}>Select</button>}
      
    </div>
  );
}
function Header({isOpen}) {
  return (
    <header>
      <h1
      // Style points
        style={{ color: "orange", fontSize: "48px", textTransform: "uppercase" }}
      >
        Liam's Pizza Co.
      </h1>
      {isOpen && <h2>Welcome!<p>We specialise in authentic italian cuisine</p></h2>}
      
    </header>
  );
}

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function Footer({ isOpen, onOrder }) {
  return (
    <footer className="footer">
      {/* Display open/closed message */}
      <p>{isOpen ? "We're currently open" : "Sorry, we're closed"}</p>
      
      {/* If the store is open, display the 'Order' button with inline style */}
      {isOpen && (
        <button
          className="btn"
          onClick={onOrder}
          style={{ color: "turquoise", fontSize: "20px", border: "1px solid black" }}
        >
          Order
        </button>
      )}
    </footer>
  );
}

function App() {
  const [orderMessage, setOrderMessage] = useState(""); // Use state for order message
  const [selectedPizzas, setSelectedPizzas] = useState([]); // Use state for selected pizzas

  // Get current hour time to check if the store is open
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= 10 && currentHour < 22;

  // Handle pizza selection
  const handleSelectPizza = (pizzaName) => {
    setSelectedPizzas((prevSelected) => [...prevSelected, pizzaName]);
  };

  // Handle order button click
  const handleOrder = () => {
    if (selectedPizzas.length > 0) {
      setOrderMessage(`Pizzas ordered: ${selectedPizzas.join(", ")}`);
    } else {
      setOrderMessage("Please select at least one pizza.");
    }
  };

  return (
    <div className="container">
      <Header isOpen={isOpen} />
      <Menu onSelectPizza={handleSelectPizza} />
      <Footer isOpen={isOpen} onOrder={handleOrder} />
      {orderMessage && <p>{orderMessage}</p>} {/* Display the order message */}
    </div>
  );
} 

  function Menu({ onSelectPizza }) {
    return (
      <div className="menu">
        <h2>Our Menu</h2>
        {pizzaData.map((pizza) => (
          <Pizza
            key={pizza.name}
            name={pizza.name}
            ingredients={pizza.ingredients}
            price={pizza.price}
            photoName={pizza.photoName}
            soldOut={pizza.soldOut}
            onSelect={onSelectPizza} // Pass onSelectPizza down as a prop
          />
        ))}
      </div>
    );
  }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// function App() {
//   // get current hour time
//   const currentHour = new Date().getHours();
//   // if current hour is between 10am and 10pm, return isOpen
//   const isOpen = currentHour >= 10 && currentHour < 22;
//   return (
//     <div className="container">
//       <Header isOpen={isOpen} />
//       <Menu />
//       <Footer isOpen={isOpen} />
//     </div>
//   );
// }