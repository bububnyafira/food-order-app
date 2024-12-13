import { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import CardDish from "./component/CardDish";
import { getDishes } from "./services/dishService";

function App() {
  const [dishes, setDishes] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() =>{
    getDishes(setDishes);
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, item) => {
      const dish = dishes.find((dish) => dish.id === item.id);
      return sum + (dish ? dish.price * item.qty : 0);
    }, 0);
    setTotalPrice(total);
  }, [cart, dishes]);

  const addToCart = (id) => {
    const dish = dishes.find((dish) => dish.id === id);
    if (!dish) return; // Jika dish tidak ditemukan, keluar
  
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { id, qty: 1, price: dish.price }]);
    }
  };
  
    return (
      <div>
        <Navbar cart={cart} totalPrice={totalPrice}/>
          <div className="flex flex-wrap justify-center"> 
            {dishes.map((dish) => (
              <CardDish key={dish.id}>
                <CardDish.Header image={dish.image_url} />
                <CardDish.Body
                  name={dish.name}
                  description={dish.description}
                  price={`Rp ${dish.price.toLocaleString()}`}
                />
                <CardDish.Footer id={dish.id} addToCart={addToCart} />
              </CardDish>
            ))}
          </div>
      </div>
    );
  }
  
  export default App;
  